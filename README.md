# Simple React weather application connected to Python (Flask API) and OpenWeatherMap API

This is very simple React weather application using OpenWeatherMap and Python Flask API. Thanks to Bootstrap for styling.

## Installation

```
git clone https://github.com/tuxwobb/weather
cd weather/backend
npm install
npm run dev
```

```
cd weather/frontend
python -m venv .venv
<activate virtual environment>
pip install -r requirements.txt
python main.py
```

## Setup

You need to generate and setup OpenWeatherMap API_KEY in .env file in backend folder in format:

```
VITE_OPEN_WEATHER_API_KEY = "<your api key>"
```

to be able fetch data from OpenWeatherMap portal.

https://openweathermap.org/
