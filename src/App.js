import { useEffect, useState } from 'react';
import './App.css';
import Prayer from './component/prayer';

function App() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [DateTimes, setDateTimes] = useState("");
  const [selectedCity, setSelectedCity] = useState("cairo"); // ✅ حفظ المدينة المختارة

  const cities = [
    { name: "القاهرة", value: "cairo" },
    { name: "الإسكندرية", value: "alex" },
    { name: "الإسماعيلية", value: "ismailia" },
    { name: "السويس", value: "suez" },
    { name: "المنصورة", value: "mansoura" },
    { name: "الجيزة", value: "giza" },
    { name: "المنيا", value: "menia" },
    { name: "البحيرة", value: "behera" },
    { name: "الشرقية", value: "sharkia" },
    { name: "الفيوم", value: "faiyum" },
    { name: "الوادي الجديد", value: "newvalley" },
    { name: "الغربية", value: "gharbia" },
    { name: "المنوفية", value: "monufia" },
  ];

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=EG&method=5`);
        const dataog = await response.json();
        setPrayerTimes(dataog.data.timings);
        setDateTimes(dataog.data.date.gregorian.date);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrayerTimes();
  }, [selectedCity]); // ✅ تحديث البيانات عند تغيير المدينة

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour > 12 ? hour - 12 : hour;
    return `${formattedHour}:${minutes} ${period}`;
  };

  return (
    <section>
      <div className='container'>
        <div className='top-sec'>
          <div className='city'>
            <h3>المدينه</h3>
            <select name="city" onChange={(e) => setSelectedCity(e.target.value)}>
              {cities.map((cityObj) => (
                <option key={cityObj.value} value={cityObj.value}>{cityObj.name}</option>
              ))}
            </select>
          </div>

          <div className='date'>
            <h3>التاريخ</h3>
            <h4>{DateTimes}</h4>
          </div>
        </div>

        <Prayer name="الفجر" time={prayerTimes.Fajr ? formatTime(prayerTimes.Fajr) : "--:--"} />
        <Prayer name="الشروق" time={prayerTimes.Sunrise ? formatTime(prayerTimes.Sunrise) : "--:--"} />
        <Prayer name="الظهر" time={prayerTimes.Dhuhr ? formatTime(prayerTimes.Dhuhr) : "--:--"} />
        <Prayer name="العصر" time={prayerTimes.Asr ? formatTime(prayerTimes.Asr) : "--:--"} />
        <Prayer name="المغرب" time={prayerTimes.Maghrib ? formatTime(prayerTimes.Maghrib) : "--:--"} />
        <Prayer name="العشاء" time={prayerTimes.Isha ? formatTime(prayerTimes.Isha) : "--:--"} />
      </div>
    </section>
  );
}

export default App;
