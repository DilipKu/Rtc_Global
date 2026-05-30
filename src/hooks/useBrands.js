import { useState, useEffect } from "react";

import client1 from "../assets/images/clients/5gjeans_logo.png";
import client2 from "../assets/images/clients/Black Jack Logo.jpg";
import client3 from "../assets/images/clients/DENIS PARK.jpeg";
import client4 from "../assets/images/clients/FLU Writing Style nd Logo.png";
import client5 from "../assets/images/clients/IZARO.jpeg";
import client6 from "../assets/images/clients/SPARK LOOGO.jpeg";
import client7 from "../assets/images/clients/h s 1.jpeg";
import client8 from "../assets/images/clients/h s 2.jpeg";
import client9 from "../assets/images/clients/happyboy_logo.png";
import client10 from "../assets/images/clients/hellobrother final logo.webp";
import client11 from "../assets/images/clients/munkey logo yellow png.png";
import client12 from "../assets/images/clients/tejoo 1.jpeg";
import client13 from "../assets/images/clients/tejoo 2.jpeg";
import client14 from "../assets/images/clients/toxy_logo_color.png";
import client15 from "../assets/images/clients/vipin.png";

const localBrands = [
  { id: 1, name: '5G Jeans', slug: '5g-jeans', src: client1 },
  { id: 2, name: 'Black Jack', slug: 'black-jack', src: client2 },
  { id: 3, name: 'Denis Park', slug: 'denis-park', src: client3 },
  { id: 4, name: 'FLU', slug: 'flu', src: client4 },
  { id: 5, name: 'Izaro', slug: 'izaro', src: client5 },
  { id: 6, name: 'Spark', slug: 'spark', src: client6 },
  { id: 7, name: 'H S', slug: 'h-s', src: client7 },
  { id: 8, name: 'H S Kids', slug: 'h-s-kids', src: client8 },
  { id: 9, name: 'Happy Boy', slug: 'happy-boy', src: client9 },
  { id: 10, name: 'Hello Brother', slug: 'hello-brother', src: client10 },
  { id: 11, name: 'Munkey', slug: 'munkey', src: client11 },
  { id: 12, name: 'Tejoo', slug: 'tejoo', src: client12 },
  { id: 13, name: 'Tejoo Premium', slug: 'tejoo-premium', src: client13 },
  { id: 14, name: 'Toxy', slug: 'toxy', src: client14 },
  { id: 15, name: 'Vipin', slug: 'vipin', src: client15 },
];

export const useBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setBrands(localBrands);
    setLoading(false);
  }, []);

  return { brands, loading };
};
