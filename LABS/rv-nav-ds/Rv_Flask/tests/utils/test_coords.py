import pytest
import sys 
import os

sys.path.append(os.path.abspath("../.."))
from utils.geometry import Geometry



def test_km_to_mile():
    mile = Geometry.km_to_mile(2)
    assert mile == 2

