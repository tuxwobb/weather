from fastapi.testclient import TestClient

from .main import app

client = TestClient(app)


def test_read_cities():
    response = client.get("/cities")
    assert response.status_code == 200


def test_read_cities():
    response = client.get("/cities?name=ostrava")
    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 8,
            "name": "ostrava",
        }
    ]


def test_read_city():
    response = client.get("/cities/8")
    assert response.status_code == 200
    assert response.json() == {
        "id": 8,
        "name": "ostrava",
    }


# def test_create_city():
#     response = client.post("/cities/", json={"name": "opava"})
#     assert response.status_code == 200


# def test_delete_city():
#     response = client.delete("/cities/3")
#     assert response.status_code == 200


# def test_update_city():
#     response = client.patch("/cities/8", json={"name": "ostrava"})
#     assert response.status_code == 200
#     assert response.json() == {
#         "id": 8,
#         "name": "ostrava",
#     }
