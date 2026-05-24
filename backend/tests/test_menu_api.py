"""Tests for the Maa Harsiddhi Darbar Foods backend /api endpoints."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://luxury-veg-eats-1.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def menu_data():
    r = requests.get(f"{API}/menu", timeout=20)
    assert r.status_code == 200, f"Expected 200 got {r.status_code}: {r.text[:200]}"
    return r.json()


# Root endpoint
def test_api_root():
    r = requests.get(f"{API}/", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert "message" in data
    assert "Maa Harsiddhi" in data["message"]


# Menu endpoint -- count & schema
def test_menu_returns_168_items(menu_data):
    assert isinstance(menu_data, list)
    assert len(menu_data) == 168, f"Expected 168 items, got {len(menu_data)}"


def test_menu_item_schema(menu_data):
    required = {"id", "name", "price", "category", "image"}
    for item in menu_data:
        missing = required - set(item.keys())
        assert not missing, f"Item {item.get('id')} missing keys: {missing}"
        assert isinstance(item["id"], str) and item["id"]
        assert isinstance(item["name"], str) and item["name"]
        assert isinstance(item["price"], int) and item["price"] > 0
        assert isinstance(item["category"], str) and item["category"]
        assert isinstance(item["image"], str) and item["image"].startswith("http")


# Menu endpoint -- categories
def test_menu_has_12_categories(menu_data):
    categories = {item["category"] for item in menu_data}
    expected = {"Chinese", "Main Course", "Tandoor Starter", "Breads", "Rice",
                "Dal", "Green Vegetable", "Curd", "Combo", "Salad", "Dessert", "Thali"}
    assert categories == expected, f"Missing: {expected - categories}, Extra: {categories - expected}"


def test_chinese_category_has_35_items(menu_data):
    chinese = [i for i in menu_data if i["category"] == "Chinese"]
    assert len(chinese) == 35, f"Expected 35 Chinese items, got {len(chinese)}"


def test_paneer_search_subset(menu_data):
    paneer = [i for i in menu_data if "paneer" in i["name"].lower()]
    assert len(paneer) > 10, f"Expected >10 paneer items, got {len(paneer)}"


def test_no_mongo_objectid_leak(menu_data):
    for item in menu_data:
        assert "_id" not in item, f"MongoDB _id leaked in item {item.get('id')}"


def test_unique_ids(menu_data):
    ids = [i["id"] for i in menu_data]
    assert len(ids) == len(set(ids)), "Duplicate IDs found in menu"
