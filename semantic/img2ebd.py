import yaml
import pickle
import torch
from torch import nn
from PIL import Image
from torchvision import transforms, models

device = torch.device('cpu')

def load_data():
    with open('image.yml') as f:
        obj = yaml.safe_load(f)
    return obj

def img_embedding(obj):
    datanum  = len(obj)
    image_paths = []
    for sample in enumerate(obj):
        image_paths.append(sample[1]['IMAGE'])
    img_ebd = make_imagedata(image_paths, datanum)
    return img_ebd

def make_imagedata(image_paths, data_num):
    # resnet呼び出し
    image_net = models.resnet50(pretrained=True)
    image_net.fc = nn.Identity()
    image_net.eval()
    image_net = image_net.to(device)
    image_vec = torch.zeros((data_num, 2048))
    batch_size = 1

    with torch.no_grad():
        for i in range(0, data_num, batch_size):
            mini_image_paths = [image_paths[j] for j in range(i, data_num)[:batch_size]]
            images = image2vec(image_net, mini_image_paths)
            image_vec[i:i + batch_size] = images
    return image_vec

def image2vec(image_net, image_paths):
    # 画像を Tensor に変換
    transformer = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    # stackはミニバッチに対応できる
    images = torch.stack([
        transformer(Image.open(image_path).convert('RGB'))
        for image_path in image_paths
    ])
    images = images.to(device)
    images = image_net(images)
    return images.cpu()

def main():
    obj = load_data()
    img_ebd = img_embedding(obj)
    with open('image.pkl', 'wb') as f:
        pickle.dump(img_ebd, f)
    

if __name__ == '__main__':
  main()