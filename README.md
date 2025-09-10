# Simple React + fastAPI webpage

React application connected to Python (Flask API) and OpenWeatherMap API
This is very simple React application using OpenWeatherMap and Python FastAPI. Thanks to Bootstrap for styling.

## Features

- weather - connected to OpenWeatherMap
- blog - using SQLite database
- files (TBD)
- gallery (TBD)
- users - managing users
- authentification - login, logout, change password

## Installation

### 1. Clone application

```
git clone https://github.com/tuxwobb/weather
```

### 2. Install and run backend python fastAPI

```
cd weather/backend
python -m venv .venv
<activate virtual environment>
pip install -r requirements.txt
uvicorn main:app --port 8000 --reload
```

### 3. Install and run frontend React application

```
cd weather/frontend
npm install
npm run dev
```

## Setup

You need to generate and setup OpenWeatherMap API_KEY in .env file in frondend folder in format:

```
VITE_OPEN_WEATHER_API_KEY = "<your api key>"
```

to be able fetch data from OpenWeatherMap portal.

## External links

https://react.dev/
https://fastapi.tiangolo.com/
https://openweathermap.org/
