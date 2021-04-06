# 正誤判定モデル
import torch
from torch import nn, optim
import torch.nn.functional as F
import tqdm
from torchvision.datasets import ImageFolder
from torchvision import transforms
from torch.utils.data import Dataset, DataLoader, TensorDataset
from torchvision import models
from PIL import Image


class Model(nn.Module):
    def __init__(self):
        super().__init__()
        self.image_fc1 = nn.Linear(2048, 1536)
        self.image_fc2 = nn.Linear(1536, 1024)
        self.image_fc3 = nn.Linear(1024, 768)

        self.ans_fc1 = nn.Linear(768, 768)
        self.ans_fc2 = nn.Linear(768, 768)

        self.total_fc1 = nn.Linear(1536, 1000)
        self.total_fc2 = nn.Linear(1000, 500)
        self.total_fc3 = nn.Linear(500, 1)



    def forward(self, image, ans):
        image = F.relu(self.image_fc1(image))
        image = F.relu(self.image_fc2(image))
        image = self.image_fc3(image)

        ans = F.relu(self.ans_fc1(ans))
        ans = self.ans_fc2(ans)

        input_feature = torch.cat([image, ans], axis=0)

        output = F.relu(self.total_fc1(input_feature))
        output = F.relu(self.total_fc2(output))
        output = self.total_fc3(output)
        print(output)

        return output
