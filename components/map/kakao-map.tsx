"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    kakao: any;
  }
}

const HOSPITAL_NAME = "소리청일곡에스한방병원";
const HOSPITAL_LAT = 35.202698;
const HOSPITAL_LNG = 126.89739;

export function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState(false);

  const initMap = () => {
    try {
      if (mapRef.current && window.kakao) {
        const coords = new window.kakao.maps.LatLng(HOSPITAL_LAT, HOSPITAL_LNG);
        const mapOptions = {
          center: coords,
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapRef.current, mapOptions);
        const marker = new window.kakao.maps.Marker({
          position: coords,
          map: map,
        });

        // 인포윈도우 생성
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${HOSPITAL_NAME}</div>`,
        });
        infowindow.open(map, marker);
      }
    } catch (error) {
      console.error('카카오맵 초기화 오류:', error);
      setMapError(true);
    }
  };

  useEffect(() => {
    if (window.kakao) {
      initMap();
    }
  }, []);

  if (mapError) {
    return (
      <div className="w-full h-full min-h-[400px] rounded-lg bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">소리청 일곡에스한방병원</h3>
          <p className="text-gray-600">광주광역시 북구 일곡동 840-2</p>
          <p className="text-gray-600">(양일로307)</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
        onLoad={() => window.kakao.maps.load(initMap)}
        onError={() => setMapError(true)}
      />
      <div ref={mapRef} className="w-full h-full min-h-[400px] rounded-lg" />
    </>
  );
}
