import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from 'react-spinners/ClipLoader';

// 1. 앱이 실행되자마자 현재위치 기반의 날씨정보가 나온다.
// 2. 날씨정보에는 도시, 섭씨 화씨, 날씨 상태
// 3. 5개의 버튼이 있다 (현재위치 1개, 다른도시위치 4개)
// 4. 도시버튼을 클릭할 때마다 도시별 날씨가 나온다.
// 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
// 6. 데이터를 들고 오는 동안 로딩스피너가 돈다.

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const cities = [
    'paris',
    'new york',
    'tokyo',
    'seoul',
    'London',
    'Toronto',
    'Hong Kong',
    'Mexico',
    'Busan',
    'Jeju City',
  ];

  const API_KEY = process.env.REACT_APP_API_KEY;

  // 도시의 날씨정보 가져오기
  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  };

  // 현재위치정보
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  // 현재위치의 날씨정보 가져오기
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    setLoading(false);
    console.log('data?', data);
  };

  const handleCityChange = (city) => {
    if (city == 'current') {
      setCity('');
    } else {
      setCity(city);
    }
  };

  useEffect(() => {
    if (city === '') {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  return (
    <div className="container">
      {loading ? (
        <div>
          <ClipLoader
            color="#f88c6b"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="box">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            city={city}
            handleCityChange={handleCityChange}
          />
        </div>
      )}
    </div>
  );
}

export default App;
