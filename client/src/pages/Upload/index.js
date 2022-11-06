import React, { useState, useEffect } from "react";
// import { storage } from "../../firebase";

import { XCircle } from "react-bootstrap-icons";

import classNames from "classnames/bind";
import styles from "./style.module.css";
const cx = classNames.bind(styles);

function UploadPage() {
  const [province, setProvince] = useState("0");
  const [provinces, setProvinces] = useState([]);
  const [district, setDistrict] = useState("0");
  const [districts, setDistricts] = useState([]);
  // eslint-disable-next-line
  const [ward, setWard] = useState("0");
  const [wards, setWards] = useState([]);

  // Handle select province
  useEffect(() => {
    const getProvinces = async () => {
      const res = await fetch("https://provinces.open-api.vn/api/p/");
      const resJson = await res.json();
      setProvinces(await resJson);
    };
    getProvinces();
  }, []);

  const handleProvinceSelect = (event) => {
    setProvince(event.target.value);
    setDistrict("0");
    setWard("0");
  };

  // Handle select district
  useEffect(() => {
    const getDistricts = async () => {
      if (province !== "0") {
        let res = await fetch(
          `https://provinces.open-api.vn/api/p/${province}?depth=2`
        );
        let resArray = await res.json();
        setDistricts(await resArray.districts);
      } else {
        setDistricts([]);
      }
    };
    getDistricts();
  }, [province]);

  const handleDistrictSelect = (event) => {
    setDistrict(event.target.value);
    setWard("0");
  };

  // Handle select ward
  useEffect(() => {
    const getWards = async () => {
      if (district !== "0") {
        const res = await fetch(
          `https://provinces.open-api.vn/api/d/${district}?depth=2`
        );
        let resArray = await res.json();
        setWards(await resArray.wards);
      } else {
        setWards([]);
      }
    };
    getWards();
  }, [district]);

  const handleWardSelect = (event) => {
    setWard(event.target.value);
  };

  const [images, setImages] = useState([]);
  // const [urls, setUrls] = useState([]);
  // const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImg = e.target.files[i];
      newImg["id"] = Math.random();
      if (images.every((e) => e.name !== newImg.name))
        setImages((prevState) => [...prevState, newImg]);
    }
  };
  // eslint-disable-next-line
  const handleUploadImgs = () => {};

  const handleDeleteImgs = (e) => {
    e.preventDefault();
    setImages([]);
    console.log("DeleteIMGS");
  };

  const handleUpload = () => {};

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("postForm")}>
        <h3 className={cx("formTitle")}>Tạo bài đăng</h3>
        <hr className={cx("formLine")}></hr>
        <div className={cx("formItem")}>
          <label className={cx("itemLabel")} htmlFor="titleInput">
            Tiêu đề bài viết
          </label>
          <input
            type={"text"}
            className={cx("itemInput")}
            placeholder="Nhập tiêu đề"
            name="titleInput"
            id="titleInput"
          />
        </div>
        <div className={cx("formItem")}>
          <label className={cx("itemLabel")} htmlFor="areaInput">
            Diện tích phòng trọ
          </label>
          <input
            type={"number"}
            className={cx("itemInput")}
            placeholder="Nhập diện tích phòng (m^2)"
            name="areaInput"
            id="areaInput"
          />
        </div>
        <div className={cx("wrapFull")}>
          <div className={cx("formItem")}>
            <label className={cx("itemLabel")} htmlFor="costInput">
              Giá phòng
            </label>
            <input
              type={"number"}
              className={cx("itemInput")}
              placeholder="Nhập giá phòng VND/tháng"
              name="costInput"
              id="costInput"
            />
          </div>
          <div className={cx("formItem")}>
            <label className={cx("itemLabel")} htmlFor="amountInput">
              Số lượng còn lại
            </label>
            <input
              type={"number"}
              className={cx("itemInput")}
              placeholder="Nhập số lượng còn lại"
              name="amountInput"
              id="amountInput"
            />
          </div>
        </div>
        <div className={cx("formItem", "flex-row")}>
          <label className={cx("itemLabel")}>Địa chỉ phòng</label>
          <div className={cx("addrBox")}>
            <div className={cx("select", "addr")}>
              <label htmlFor="province">Tỉnh/Thành phố</label>
              <select
                id="province"
                name="province"
                onChange={(e) => handleProvinceSelect(e)}
              >
                <option key={"0"} value="0" defaulvalue={0}>
                  --Chọn Tỉnh/Thành phố--
                </option>
                {provinces.map((e) => (
                  <option key={e.code} value={e.code}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={cx("select", "addr")}>
              <label htmlFor="district">Quận/Huyện</label>
              <select
                id="district"
                name="district"
                onChange={(e) => handleDistrictSelect(e)}
              >
                <option value="0" defaulvalue={0}>
                  --Chọn Quận/Huyện--
                </option>
                {districts.map((e) => (
                  <option key={e.code} value={e.code}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={cx("select", "addr")}>
              <label htmlFor="ward">Xã/Phường</label>
              <select
                id="ward"
                name="ward"
                onChange={(e) => handleWardSelect(e)}
              >
                <option value="0" defaulvalue={0}>
                  --Chọn Xã/Phường--
                </option>
                {wards.map((e) => (
                  <option key={e.code} value={e.code}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={cx("addr")}>
              <label htmlFor="addressInput">Số nhà, đường</label>
              <input
                type="text"
                className={cx("itemInput")}
                placeholder="Nhập số nhà, đường..."
                name="addressInput"
                id="addressInput"
                style={{ boxShadow: "0px 0px 0px 1px #DCDFE4" }}
              />
            </div>
          </div>
        </div>
        <div className={cx("formItem")}>
          <label className={cx("itemLabel")} htmlFor="inforInput">
            Thông tin liên hệ
          </label>
          <input
            type="text"
            className={cx("itemInput")}
            placeholder="Nhập thông tin liên hệ"
            name="inforInput"
            id="inforInput"
          />
        </div>
        <div className={cx("formItem")}>
          <label className={cx("itemLabel")} htmlFor="descInput">
            Mô tả phòng
          </label>
          <textarea
            className={cx("itemInput")}
            placeholder="Nhập mô tả chi tiết"
            name="descInput"
            id="descInput"
            rows={2}
            style={{ resize: "none" }}
          ></textarea>
        </div>
        <div
          className={cx("uploadImgs")}
          onChange={handleChange}
          style={
            images.length >= 4
              ? { backgroundColor: "rgba(0,255,0,0.2)" }
              : images.length > 0 && images.length < 4
              ? { backgroundColor: "rgb(255 204 201)" }
              : null
          }
        >
          <input
            type="file"
            name="images"
            multiple="multiple"
            accept="image/*"
          />
          {images.length > 0 ? (
            images.map((e) => (
              <div key={e.id} style={{ paddingLeft: "12px"}} value={e.id}>
                {e.name}
              </div>
            ))
          
          ) : (
            <p className={cx("boxText")}>
              Click to browse or <br /> drag and drop your files <br />
            </p>
          )}
          {images.length > 0 && images.length < 4 ? (
            <span
              style={{
                fontStyle: "italic",
                color: "rgb(106 106 106)",
                position: "absolute",
                bottom: "2px",
              }}
            >
              (at least 4 photos)
            </span>
          ) : null}
          {images.length > 0 && (
            <XCircle
              size={16}
              color="/* rgb(106 106 106) */#fff"
              style={{ zIndex: 100, position: "absolute", right: "24px", backgroundColor: "#000", borderRadius: "50%" }}
              onClick={handleDeleteImgs}
            />
          )}
        </div>
        <div className="wrapFull">
          <button
            className={cx("btn")}
            type="button"
            id="upload"
            onClick={(e) => handleUpload(e)}
          >
            ĐĂNG BÀI
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
