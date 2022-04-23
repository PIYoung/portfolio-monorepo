import os
import pandas as pd
from shutil import copyfile
from absl import app, flags

"""
script run example : 
python open_images_dataset_30_class_parsing.py \
        --class_file_path=class-descriptions-boxable.csv \
        --annotation_file_path=validation-annotations-bbox.csv \
        --image_folder_path=open_images_validation \
        --filtered_image_folder_path=filtered_validation_images
"""

flags.DEFINE_string(
    "class_file_path",
    default="/Users/piyoung/workspaces/portfolio/apps/ai-yolo/class-descriptions-boxable.csv",
    help="class-descriptions-boxable.csv file path",
)
flags.DEFINE_string(
    "annotation_file_path",
    default="/Users/piyoung/workspaces/portfolio/apps/ai-yolo/validation-annotations-bbox.csv",
    help="validation-annotations-bbox.csv file path",
)
flags.DEFINE_string(
    "image_folder_path",
    default="/Users/piyoung/workspaces/portfolio/apps/ai-yolo/open_images_validation",
    help="image folder path",
)
flags.DEFINE_string(
    "filtered_image_folder_path",
    default="/Users/piyoung/workspaces/portfolio/apps/ai-yolo/filtered_validation_images",
    help="filtered image folder path",
)

FLAGS = flags.FLAGS

# 30 amenity class
TARGET_30_CLASSES = [
    "Toilet",
    "Swimming pool",
    "Bed",
    "Billiard table",
    "Sink",
    "Fountain",
    "Oven",
    "Ceiling fan",
    "Television",
    "Microwave oven",
    "Gas stove",
    "Refrigerator",
    "Kitchen & dining room table",
    "Washing machine",
    "Bathtub",
    "Stairs",
    "Fireplace",
    "Pillow",
    "Mirror",
    "Shower",
    "Couch",
    "Countertop",
    "Coffeemaker",
    "Dishwasher",
    "Sofa bed",
    "Tree house",
    "Towel",
    "Porch",
    "Wine rack",
    "Jacuzzi",
]


def make_directory(target_path):
    if not os.path.exists(target_path):
        os.mkdir(target_path)
        print("Directory ", target_path, " Created ")
    else:
        print("Directory ", target_path, " already exists")


def find_id_by_name(class_label_df, target_name):
    return class_label_df.loc[class_label_df["name"] == target_name]["id"].values[0]


def main(_):
    class_label_df = pd.read_csv(FLAGS.class_file_path, names=["id", "name"])
    print(class_label_df.head())
    annotation_df = pd.read_csv(FLAGS.annotation_file_path, header=0)
    print(annotation_df.head())

    target_class_id_dict = {}
    make_directory(FLAGS.filtered_image_folder_path)
    make_directory(
        FLAGS.filtered_image_folder_path + os.sep + "aggregated"
    )  # Total 30 class images
    for class_name in TARGET_30_CLASSES:
        make_directory(FLAGS.filtered_image_folder_path + os.sep + class_name)
        target_class_id_dict[class_name] = find_id_by_name(class_label_df, class_name)
    print(target_class_id_dict)
    target_id_class_dict = {v: k for k, v in target_class_id_dict.items()}

    for index, row in annotation_df.iterrows():
        if row["LabelName"] in target_class_id_dict.values():
            copyfile(
                FLAGS.image_folder_path + os.sep + row["ImageID"] + ".jpg",
                FLAGS.filtered_image_folder_path
                + os.sep
                + "aggregated"
                + os.sep
                + row["ImageID"]
                + ".jpg",
            )
            copyfile(
                FLAGS.image_folder_path + os.sep + row["ImageID"] + ".jpg",
                FLAGS.filtered_image_folder_path
                + os.sep
                + target_id_class_dict[row["LabelName"]]
                + os.sep
                + row["ImageID"]
                + ".jpg",
            )


if __name__ == "__main__":
    app.run(main)
