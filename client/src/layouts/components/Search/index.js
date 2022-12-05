import React, { useState, useEffect } from "react";
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom'
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

function Search() {
    let navigate = useNavigate();

    const [province, setProvince] = useState("0");
    const [money, setMoney] = useState("0")
    const [area, setArea] = useState("0")
    const [provinces, setProvinces] = useState([]);

    useEffect(() => {
        const getProvinces = async () => {
        const res = await fetch("https://provinces.open-api.vn/api/p/");
        const resJson = await res.json();
        setProvinces(await resJson);
    };
    getProvinces();
  }, []);

    const moneyList = [
        {content: "0 - 500k", value: [0, 500]},
        {content: "500k - 1 triệu", value: [500, 1000]},
        {content: "1 triệu - 2 triệu", value: [1000, 2000]},
        {content: "2 triệu - 3 triệu", value: [2000, 3000]},
        {content: "3 triệu - 5 triệu", value: [3000, 5000]},
        {content: "5 triệu - 10 triệu", value: [5000, 2000]},
        {content: "trên 10 triệu", value: [1000, -1]},
    ]

    const areList = [    
        {content: "10m", value: 10},
        {content: "20m", value: 20},
        {content: "30m", value: 30},
        {content: "40m", value: 40},
        {content: "50m", value: 50},
        {content: "60m", value: 60},
        {content: "70m", value: 70},
        {content: "80m", value: 80},
        {content: "90m", value: 90},
        {content: "100m", value: 100},
    ]

    const handleClickSearch = () => {
        if (money == 0 || area == 0 || province == 0) {
            if (province == 0) {
                const Element = document.getElementsByClassName(styles.province)[0]
                console.log(Element.classList.add(cx('fail')))
            }
            if (money == 0) {
                const Element = document.getElementsByClassName(styles.money)[0]
                console.log(Element.classList.add(cx('fail')))
                document.getElementsByClassName(styles.containerSearchIc)[0].classList.add(cx('fail'))

            }
            if (area == 0) {
                const Element = document.getElementsByClassName(styles.area)[0]
                console.log(Element.classList.add(cx('fail')))
            }
        }
        else {
            navigate(`/search?province=${province}&area=${area}&money=${money}`)
        }
    }
        return (
        <div style={{display: "flex"}}>
            <div className = {cx("wrapperSelect")}>
                <select
                    className={cx("province")}
                    name="province"
                    onChange={(e) => setProvince(e.target.value)}
                    onFocus = {(e) => e.target.classList.remove(cx('fail'))}
                >
                    <option key={"0"} value="0" defaulvalue={0}>
                        Khu vực
                    </option>
                   
                    {provinces.map((e) => (
                    <option key={e.code} value={e.name}>
                        {e.name}
                    </option>
                    ))}
                </select>
            </div>
            <div className = {cx("wrapperSelect")}>
            <select
                className={cx("area")}
                name="area"
                onChange={(e) => setArea(e.target.value)}
                onFocus = {(e) => e.target.classList.remove(cx('fail'))}
              
              >
                <option key={"0"} value="0" defaulvalue={0}>
                    Diện tích
                </option>
                {areList.map((value, index) => (
                  <option key={index} value={value.value} >
                    {value.content}
                  </option>
                ))}
              </select>
            </div>
            <select
                className={cx("money")}
                name="money"
                onChange={(e) => setMoney(e.target.value)}
                onFocus = {(e) => {
                    document.getElementsByClassName(styles.containerSearchIc)[0].classList.remove(cx('fail'))
                    e.target.classList.remove(cx('fail'))
                  }
                }
            >
                <option key={"0"} value="0" defaulvalue={0}>
                  Giá phòng
                </option>
                {moneyList.map((value, index) => (
                  <option key={index} value={value.value}  >
                  {value.content}
                  </option>
                ))}
              </select>
            <div className = {styles.containerSearchIc}
                onClick = {handleClickSearch}
            >
            <div className = {styles.innerSearchIc}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
            </div>
                
            </div>
        </div>
    );
}

export default Search;
