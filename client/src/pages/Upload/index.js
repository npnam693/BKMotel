import React, {
  useState,
  useEffect,
  useCallback,
  Fragment,
  useRef,
} from "react";
import { Button } from "@mui/material";

import { XCircle } from "react-bootstrap-icons";
import { useSnackbar } from "notistack";
import classNames from "classnames/bind";
import styles from "./style.module.css";
import { storage } from "./../../firebase";
import { ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import { getDownloadURL } from "firebase/storage";
import axiosClient from '../../api/axiosClient.js';
import { UserState } from "./../../Context/UserProvider/index";
import { CircularProgress } from "@mui/material";
const cx = classNames.bind(styles);

function UploadPage() {
  const { userInfo } = UserState();
  const [province, setProvince] = useState("0");
  const [provinces, setProvinces] = useState([]);
  const [district, setDistrict] = useState("0");
  const [districts, setDistricts] = useState([]);
  // eslint-disable-next-line
  const [ward, setWard] = useState("0");
  const [wards, setWards] = useState([]);

  const inputTitleRef = useRef(null);
  const inputAreaRef = useRef(null);
  const inputPriceRef = useRef(null);
  const inputRestRef = useRef(null);
  const inputAddrRef = useRef(null);
  const inputContactRef = useRef(null);
  const inputInforRef = useRef(null);
  const provinceRef = useRef(null);
  const districtRef = useRef(null);
  const wardRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const toast = (message, variantType) => {
    enqueueSnackbar(message, {
      variant: variantType,
      action: (key) => (
        <Button
          style={{ fontSize: "12px", fontWeight: "600" }}
          size="small"
          onClick={() => closeSnackbar(key)}
        >
          Dismiss
        </Button>
      ),
    });
  };

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

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImg = e.target.files[i];
      newImg["id"] = Math.random();
      if (images.every((e) => e.name !== newImg.name))
        setImages((prevState) => [...prevState, newImg]);
    }
  };

  const handleDeleteImgs = (e) => {
    e.preventDefault();
    setImages([]);
  };

  const resetValue = () => {
    inputTitleRef.current.value = "";
    inputAddrRef.current.value = "";
    wardRef.current.value = "0";
    districtRef.current.value = "0";
    provinceRef.current.value = "0";
    inputContactRef.current.value = "";
    inputInforRef.current.value = "";
    inputPriceRef.current.value = "1000000";
    inputRestRef.current.value = "1";
    inputAreaRef.current.value = "100";
    setImages([]);
  };

  const getTextAddress = async (province, district, ward, resolve) => {
    let result = { p: "", d: "", w: "" };
    let temp = await fetch(`https://provinces.open-api.vn/api/p/${province}`);
    let tempJson = await temp.json();
    result.p = tempJson.name;
    temp = await fetch(`https://provinces.open-api.vn/api/d/${district}`);
    tempJson = await temp.json();
    result.d = tempJson.name;
    temp = await fetch(`https://provinces.open-api.vn/api/w/${ward}`);
    tempJson = await temp.json();
    result.w = tempJson.name;
    resolve(result);
  };

  const uploadImage = async (image) => {
    return new Promise((resolve, reject) => {
      const imageRef = ref(storage, `images/${image.name + v4()}`);
      const uploadTask = uploadBytesResumable(imageRef, image);
      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            resolve(downloadURL)
          );
        }
      );
    });
  };

  const uploadImages = (imgs) => {
    let links = [];
    return new Promise(async (resolve) => {
      for (let i = 0; i < imgs.length; i++) {
        await uploadImage(imgs[i]).then((res) => {
          links.push(res);
        });
      }
      resolve(links);
    });
  };

  const HandleUpload = (e) => {
    setLoading(true);
    if (inputTitleRef.current.value.trim() === "") {
      showSnackbarMessage("Ph???i ??i???n ti??u ????? b??i vi???t");
      setLoading(false);
      return;
    }
    if (inputTitleRef.current.value.trim().length > 100) {
      showSnackbarMessage("Ti??u ????? kh??ng qu?? 100 k?? t???");
      setLoading(false);
      return;
    }
    if (inputAreaRef.current.value === "") {
      showSnackbarMessage("Ph???i ??i???n di???n t??ch ph??ng tr???");
      setLoading(false);
      return;
    }
    if (inputAreaRef.current.value <= 0) {
      showSnackbarMessage("Di???n t??ch ph???i l???n h??n 0");
      setLoading(false);
      return;
    }
    if (inputPriceRef.current.value === "") {
      showSnackbarMessage("Ph???i ??i???n gi?? ph??ng tr???");
      setLoading(false);
      return;
    }
    if (inputPriceRef.current.value <= 0) {
      showSnackbarMessage("Gi?? ph??ng ph???i l???n h??n 0");
      setLoading(false);
      return;
    }
    if (inputRestRef.current.value === "") {
      showSnackbarMessage("Ph???i ??i???n s??? ph??ng");
      setLoading(false);
      return;
    }
    if (inputRestRef.current.value <= 0) {
      showSnackbarMessage("S??? ph??ng ph???i l???n h??n 0");
      setLoading(false);
      return;
    }
    if (
      province === "0" ||
      district === "0" ||
      ward === "0" ||
      inputAddrRef.current.value.trim() === ""
    ) {
      showSnackbarMessage("Ph???i ??i???n ?????y ????? ?????a ch???");
      setLoading(false);
      return;
    }
    if (inputContactRef.current.value.trim() === "") {
      showSnackbarMessage("Ph???i ??i???n th??ng tin li??n h???");
      setLoading(false);
      return;
    }
    if (inputInforRef.current.value.trim() === "") {
      showSnackbarMessage("Ph???i ??i???n m?? t??? ph??ng");
      setLoading(false);
      return;
    }
    if (images.length < 1) {
      showSnackbarMessage("B???t bu???c ph???i t???i ???nh l??n");
      setLoading(false);
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      let data = {};
      const add = new Promise((resolve) => {
        getTextAddress(province, district, ward, resolve);
      });
      data.title = inputTitleRef.current.value.trim();
      data.area = parseFloat(inputAreaRef.current.value);
      data.price = parseFloat(inputPriceRef.current.value);
      data.remainCount = parseInt(inputRestRef.current.value);
      data.address = inputAddrRef.current.value.trim();
      data.contact = inputContactRef.current.value.trim();
      data.description = inputInforRef.current.value.trim();
      data._id = userInfo._id;
      Promise.all([add, uploadImages(images)])
        .then((value) => {
          data.province = value[0].p;
          data.district = value[0].d;
          data.ward = value[0].w;
          data.image = value[1];
          resetValue();
        })
        .then(async () => {
          try {
            const response = await axiosClient.post(
              "/api/rooms/upload",
              data,
              config
            );
            if (response.data._id) {
              toast("Upload th??nh c??ng", "success");
              setLoading(false);
            } else {
              toast(response.data.message, "error");
            }
          } catch (error) {
            console.log(error);
          }
        });
    } catch (error) {
      showSnackbarMessage("Something wrong @@");
    }
  };

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const showSnackbarMessage = useCallback(
    (message) => {
      enqueueSnackbar(message, {
        variant: "warning",
        action: (key) => (
          <Fragment>
            <Button
              style={{ fontSize: "12px", fontWeight: "600" }}
              size="small"
              onClick={() => closeSnackbar(key)}
            >
              Dismiss
            </Button>
          </Fragment>
        ),
      });
    },
    [enqueueSnackbar, closeSnackbar]
  );

  return (
    <div className={cx("wrapper")}>
      <div className={cx("postForm")}>
        <h3 className={cx("formTitle")}>T???o b??i ????ng</h3>
        <hr className={cx("formLine")}></hr>
        <div className={cx("formItem")}>
          <label className={cx("itemLabel")} htmlFor="titleInput">
            Ti??u ????? b??i vi???t
          </label>
          <input
            type={"text"}
            className={cx("itemInput")}
            placeholder="Nh???p ti??u ?????"
            name="titleInput"
            id="titleInput"
            maxLength="100"
            ref={inputTitleRef}
          />
        </div>
        <div className={cx("formItem")}>
          <label className={cx("itemLabel")} htmlFor="areaInput">
            Di???n t??ch ph??ng tr???
          </label>
          <input
            type={"number"}
            className={cx("itemInput")}
            placeholder="Nh???p di???n t??ch ph??ng (m^2)"
            name="areaInput"
            id="areaInput"
            ref={inputAreaRef}
            defaultValue={100}
          />
        </div>
        <div className={cx("wrapFull")}>
          <div className={cx("formItem")}>
            <label className={cx("itemLabel")} htmlFor="costInput">
              Gi?? ph??ng
            </label>
            <input
              type={"number"}
              className={cx("itemInput")}
              placeholder="Nh???p gi?? ph??ng VND/th??ng"
              name="costInput"
              id="costInput"
              ref={inputPriceRef}
              defaultValue={1000000}
            />
          </div>
          <div className={cx("formItem")}>
            <label className={cx("itemLabel")} htmlFor="amountInput">
              S??? l?????ng c??n l???i
            </label>
            <input
              type={"number"}
              className={cx("itemInput")}
              placeholder="Nh???p s??? l?????ng c??n l???i"
              name="amountInput"
              id="amountInput"
              ref={inputRestRef}
              defaultValue={1}
              min="0"
              step={1}
            />
          </div>
        </div>
        <div className={cx("formItem", "flex-row")}>
          <label className={cx("itemLabel")}>?????a ch??? ph??ng</label>
          <div className={cx("addrBox")}>
            <div className={cx("select", "addr")}>
              <label htmlFor="province">T???nh/Th??nh ph???</label>
              <select
                id="province"
                name="province"
                onChange={(e) => handleProvinceSelect(e)}
                ref={provinceRef}
              >
                <option key={"0"} value="0" defaulvalue={0}>
                  --Ch???n T???nh/Th??nh ph???--
                </option>
                {provinces.map((e) => (
                  <option key={e.code} value={e.code}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={cx("select", "addr")}>
              <label htmlFor="district">Qu???n/Huy???n</label>
              <select
                id="district"
                name="district"
                onChange={(e) => handleDistrictSelect(e)}
                ref={districtRef}
              >
                <option value="0" defaulvalue={0}>
                  --Ch???n Qu???n/Huy???n--
                </option>
                {districts.map((e) => (
                  <option key={e.code} value={e.code}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={cx("select", "addr")}>
              <label htmlFor="ward">X??/Ph?????ng</label>
              <select
                id="ward"
                name="ward"
                onChange={(e) => handleWardSelect(e)}
                ref={wardRef}
              >
                <option value="0" defaulvalue={0}>
                  --Ch???n X??/Ph?????ng--
                </option>
                {wards.map((e) => (
                  <option key={e.code} value={e.code}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={cx("addr")}>
              <label htmlFor="addressInput">S??? nh??, ???????ng</label>
              <input
                type="text"
                className={cx("itemInput")}
                placeholder="Nh???p s??? nh??, ???????ng..."
                name="addressInput"
                id="addressInput"
                style={{ boxShadow: "0px 0px 0px 1px #DCDFE4" }}
                ref={inputAddrRef}
              />
            </div>
          </div>
        </div>
        <div className={cx("formItem")}>
          <label className={cx("itemLabel")} htmlFor="inforInput">
            Th??ng tin li??n h???
          </label>
          <input
            type="text"
            className={cx("itemInput")}
            placeholder="Nh???p th??ng tin li??n h???"
            name="inforInput"
            id="inforInput"
            ref={inputContactRef}
          />
        </div>
        <div className={cx("formItem")}>
          <label className={cx("itemLabel")} htmlFor="descInput">
            M?? t??? ph??ng
          </label>
          <textarea
            className={cx("itemInput")}
            placeholder="Nh???p m?? t??? chi ti???t"
            name="descInput"
            id="descInput"
            rows={2}
            style={{ resize: "none" }}
            ref={inputInforRef}
          ></textarea>
        </div>
        <div
          className={cx("uploadImgs")}
          onChange={handleChange}
          style={
            images.length > 0 ? { backgroundColor: "rgba(0,255,0,0.2)" } : null
          }
        >
          <input
            type="file"
            name="images"
            multiple="multiple"
            accept="image/*"
            id="imgs"
            // ref={imgRef}
          />
          {images.length > 0 ? (
            images.map((e) => (
              <div key={e.id} style={{ paddingLeft: "12px" }} value={e.id}>
                {e.name}
              </div>
            ))
          ) : (
            <p className={cx("boxText")}>
              Click to browse or <br /> drag and drop your files <br />
            </p>
          )}
          {/* {images.length > 0 && images.length < 4 ? (
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
          ) : null} */}
          {images.length > 0 && (
            <XCircle
              size={16}
              color="/* rgb(106 106 106) */#fff"
              style={{
                zIndex: 100,
                position: "absolute",
                right: "24px",
                backgroundColor: "#000",
                borderRadius: "50%",
              }}
              onClick={handleDeleteImgs}
            />
          )}
        </div>
        <div className="wrapFull">
          <button
            className={cx("btn")}
            type="button"
            id="upload"
            disabled={loading}
            onClick={(e) => HandleUpload(e)}
            style={loading ? { opacity: "0.5" } : null}
          >
            {loading ? <CircularProgress size={16} /> : "????NG B??I"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
