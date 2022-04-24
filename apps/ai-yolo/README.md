# Object Detection

## Portfolio AI-YOLO(Tensorflow)

- Project: airbnb clone coding
- Author: PIYoung
- Period: 2022. 04. 11 ~ 2022.04.23
- Reference: <https://medium.com/airbnb-engineering/categorizing-listing-photos-at-airbnb-f9483f3ab7e3>

install tensorflow on MacOS(11+) Apple Silicon(M1+)

```zsh
conda install -c apple tensorflow-deps
python3 -m pip install tensorflow-macos
python3 -m pip install tensorflow-metal
```

install object_detection on MacOS(11+) Apple Silicon(M1+)
not perfect but works fine

```zsh
conda install -c conda-forge matplotlib -y
conda install -c conda-forge scikit-learn -y
conda install -c conda-forge opencv -y
conda install -c conda-forge pandas -y

cd apps/ai-yolo
mkdir -p Tensorflow/models
git clone https://github.com/tensorflow/models Tensorflow/models
cd Tensorflow/models/research
protoc object_detection/protos/*.proto --python_out=.
cp object_detection/packages/tf2/setup.py .
python3 -m pip install --force --no-dependencies .

pip install tf-slim
pip install pycocotools
pip install lxml
pip install lvis
pip install contextlib2
pip install --no-dependencies tf-models-official
pip install avro-python3
pip install pyyaml
Pip install gin-config
```

### Open images dataset

- Link: <https://storage.googleapis.com/openimages/web/download_v4.html>
- Version: V4
- Boxes: Train, Validation
- Metadata: Class Names
- Images: 아래 참조

```zsh
pip install awscli
# set target dir path
aws s3 --no-sign-request sync s3://open-images-dataset/validation [target_dir/validation]
```

### Filtering dataset

전체 이미지에서 Amenity 30개 class가 포함된 이미지만 선별하기

```zsh
python3 apps/ai-yolo/scripts/open_images_dataset_30_class_parsing.py
```
