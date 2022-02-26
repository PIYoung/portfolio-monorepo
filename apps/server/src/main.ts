import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import fs from 'fs';
import helmet from 'helmet';
import { path } from 'app-root-path';
import { join } from 'path';
import { performance } from 'perf_hooks';

// import * as Models from './models/index';
// import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
// import { AppModule } from './modules/app.module';
// import { ClusterService } from './services/cluster.service';
// import { logger } from './utils/logger';
// import { getLocalIp } from './utils/os';

async function bootstrap() {
  const localIp = getLocalIp();
  const port = process.env.PORT ?? 3000;
  const httpsOptions: HttpsOptions = {
    key: fs.readFileSync('./secrets/privkey.pem'),
    cert: fs.readFileSync('./secrets/fullchain.pem'),
  };

  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server), {
    logger,
    ...(env === 'local' ? {} : { httpsOptions }),
    cors: {
      origin: env === 'development' ? ['https://stg.mommoss.com:3102'] : env === 'local' ? true : 'mommoss.com',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  });

  app.useWebSocketAdapter(new WsAdapter(app));

  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          imgSrc: [`'self'`, '*.jsdelivr.net', 'blob:', 'data:', 'validator.swagger.io'],
          styleSrc: [`'self'`, '*.fonts.googleapis.com', '*.jsdelivr.net', `'unsafe-inline'`],
          fontSrc: [`'self'`, '*.fonts.googleapis.com', '*.jsdelivr.net'],
          scriptSrc: [`'self'`, '*.jsdelivr.net', `https: 'unsafe-inline'`, `'unsafe-eval'`],
        },
      },
    }),
  );
  app.use(compression());
  app.use(cookieParser());

  app.useStaticAssets(join(path, 'uploads/secure'), {
    index: false,
    redirect: false,
  });

  app.setGlobalPrefix('sunflower-care');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  if (env === 'development' || env === 'local') {
    const config = new DocumentBuilder()
      .setTitle('해바라기 간병인 어플')
      .setDescription(
        '<h4>해바라기 간병인 어플 REST APIs</h4>' +
          '<h5>nestJS</h5><h5>written by bjs, PIYoung</h5>' +
          '<div id="token-table-div">' +
          '<div>' +
          '<h4>사용자 토큰 선택 <span>펼치기/접기</span></h4>' +
          '<table border="1px solid black">' +
          '<tr><th>아이디</th><th>토큰</th></tr>' +
          '<tr><td>01040321093</td><td><a>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQwMTUzMjEyLCJleHAiOjMzMTk3NzUzMjEyfQ.SyLs1pKbWK_zS13Y3vp0-m4myGGPwOWt2y9zkRRfNCk</a></td></tr>' +
          '<tr><td>01027172868</td><td><a>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjQwMTUzMjI1LCJleHAiOjMzMTk3NzUzMjI1fQ.Ss3VXL5-DakLfSW1E8datYd7mf0dO2zGG2qSDv3sIKw</a></td></tr>' +
          '<tr><td>01047563191</td><td><a>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjQwMTUzMjM3LCJleHAiOjMzMTk3NzUzMjM3fQ.HjhtuwkuofdkX6o4i69IoE72b02k8OBfSOgISUx7g44</a></td></tr>' +
          '<tr><td>01045422363</td><td><a>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjQwMTUzMjYxLCJleHAiOjMzMTk3NzUzMjYxfQ.C1Jh7wdqcm19HmXiq0WMgoo7g3M5pA8LFf8B4MdadHo</a></td></tr>' +
          '<tr><td>01093671378</td><td><a>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjQwMTUzMjcyLCJleHAiOjMzMTk3NzUzMjcyfQ.NgvjlOextRRbjlvNXWJo29QwjcpLrB5MKs5D5i3N2Bw</a></td></tr>' +
          '</table>' +
          '</div>' +
          '<div>' +
          '<h4>관리자 토큰 선택 <span>펼치기/접기</span></h4>' +
          '<table border="1px solid black">' +
          '<tr><th>아이디</th><th>토큰</th></tr>' +
          '<tr><td>admin</td><td><a>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNTdXBlcnZpc29yIjp0cnVlLCJpYXQiOjE2NDAxNTM0MjMsImV4cCI6MzMxOTc3NTM0MjN9.VsrLtq5dzPEYE1oWX0-GmakdKJN5CiseIuIT2usBZtg</a></td></tr>' +
          '<tr><td>piy</td><td><a>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaXNTdXBlcnZpc29yIjp0cnVlLCJpYXQiOjE2NDAxNTM0MzksImV4cCI6MzMxOTc3NTM0Mzl9.qu9hiMEnbqBcpQOKa0UrDVHuEII4p2tpSKKM8zkYpkY</a></td></tr>' +
          '</table>' +
          '</div>' +
          '</div>',
      )
      .setVersion('1.0.0')
      .addServer(env === 'local' ? `http://${localIp}:${port}` : 'https://stg.mommoss.com:3102')
      // <font color="blue"><b>작업 중</b></font>
      .addTag('auth', '권한 REST APIs')
      .addTag('care-applications', '돌봄신청서 REST APIs')
      .addTag('care-giver-registrations', '간병인 등록신청서 REST APIs')
      .addTag('care-giver-reviews', '간병인 리뷰 REST APIs')
      .addTag('chats', '채팅 REST APIs <font color="blue"><b>작업 중</b></font>')
      .addTag('chat-attach-files', '채팅 첨부파일 REST APIs <font color="blue"><b>작업 중</b></font>')
      .addTag('chat-members', '채팅 멤버 REST APIs <font color="blue"><b>작업 중</b></font>')
      .addTag('chat-rooms', '채팅방 REST APIs <font color="blue"><b>작업 중</b></font>')
      .addTag('consulting', '상담 REST APIs <font color="blue"><b>작업 중</b></font>')
      .addTag('consulting-chats', '상담 채팅 REST APIs <font color="blue"><b>작업 중</b></font>')
      .addTag('consulting-attach-files', '상담 채팅 첨부파일 REST APIs <font color="blue"><b>작업 중</b></font>')
      .addTag('consulting-members', '상담 채팅 멤버 REST APIs <font color="blue"><b>작업 중</b></font>')
      .addTag('consulting-rooms', '상담 채팅방 REST APIs <font color="blue"><b>작업 중</b></font>')
      .addTag('files', '파일 업로드 REST APIs')
      .addTag('services', '서비스 REST APIs')
      .addTag('supervisors', '관리자 REST APIs <font color="red"><b>관리자 토큰 필수</b></font>')
      .addTag('supervisors-dashboard', '관리자 REST APIs <font color="red"><b>관리자 토큰 필수</b></font>')
      .addTag('supervisors-statistics', '관리자 통계 REST APIs <font color="red"><b>관리자 토큰 필수</b></font>')
      .addTag('users', '사용자 REST APIs <font color="blue"><b>작업 중</b></font>')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: Object.entries(Models).map(([name, model]) => model),
    });
    const SnippetGeneratorPlugin = {
      statePlugins: {
        spec: {
          wrapSelectors: {
            requestFor: (ori: any, system: any) => (state: any, path: any, method: any) => {
              return ori(path, method)
                ?.set('spec', state.get('json', {}))
                ?.setIn(['oasPathMethod', 'path'], path)
                ?.setIn(['oasPathMethod', 'method'], method);
            },
            mutatedRequestFor: (ori: any) => (state: any, path: any, method: any) => {
              return ori(path, method)
                ?.set('spec', state.get('json', {}))
                ?.setIn(['oasPathMethod', 'path'], path)
                ?.setIn(['oasPathMethod', 'method'], method);
            },
          },
        },
      },
      fn: {
        requestSnippetGenerator_node_native: (req: any) => {
          const { spec, oasPathMethod } = req.toJS();
          const { path, method } = oasPathMethod;
          const targets = ['node_native'];

          let snippet: string;
          try {
            snippet = this.OpenAPISnippets.getEndpointSnippets(spec, path, method, targets).snippets[0].content;
          } catch (err) {
            snippet = JSON.stringify({ err });
          }

          return snippet;
        },
        requestSnippetGenerator_javascript_xhr: (req: any) => {
          const { spec, oasPathMethod } = req.toJS();
          const { path, method } = oasPathMethod;
          const targets = ['javascript_xhr'];

          let snippet: string;
          try {
            snippet = this.OpenAPISnippets.getEndpointSnippets(spec, path, method, targets).snippets[0].content;
          } catch (err) {
            snippet = JSON.stringify({ err });
          }

          return snippet;
        },
      },
    };
    SwaggerModule.setup('sunflower-care/api-docs', app, document, {
      explorer: true,
      customSiteTitle: '해바라기 케어',
      customfavIcon: '/swagger-favicon/favicon.ico',
      customCssUrl: '/swagger-themes/3.x/theme-feeling-blue.css',
      customJs: '/swagger-js/index.js',
      swaggerOptions: {
        plugins: [SnippetGeneratorPlugin],
        docExpansion: 'list', // "list"*, "full", "none"
        persistAuthorization: true,
        requestSnippetsEnabled: true,
        requestSnippets: {
          generators: {
            node_native: {
              title: 'Node',
              syntax: 'javascript',
            },
            javascript_xhr: {
              title: 'XHR',
              syntax: 'javascript',
            },
          },
          languages: ['curl_bash', 'node_native', 'javascript_xhr'],
        },
        syntaxHighlight: {
          activate: true,
          theme: 'nord',
        },
      },
    });
  }

  await app.listen(port, () => {
    logger.log(`┌─────────────────────────────────────────────────────────────────────┐`);
    logger.log(`│   🟢 Starting: ${new Date().toISOString()}                             │`);
    if (env === 'local')
      logger.log(`│   🟢 The http server is listening on local ${localIp + ' ' || '127.0.0.1      '}          │`);
    else logger.log(`│   🟢 The https server is listening on 'https://stg.mommoss.com:3102 │`);
    logger.log(`│   🟢 The http server is listening on port ${port}.                     │`);
    logger.log(`└─────────────────────────────────────────────────────────────────────┘`);
  });

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

if (env === 'development' || env === 'local') bootstrap();
else ClusterService.init(bootstrap);
