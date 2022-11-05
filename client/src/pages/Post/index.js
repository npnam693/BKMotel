import React from "react";

import { Plus } from "react-bootstrap-icons";

import classNames from "classnames/bind";
import styles from "./style.module.css";
const cx = classNames.bind(styles);

function PostPage() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("postForm")}>
        <h3 className={cx("formTitle")}>Tạo bài đăng</h3>
        <hr className={cx("formLine")}></hr>
        <div className={cx("formItem")}>
          <label className={cx("itemLabel")} for="titleInput">
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
          <label className={cx("itemLabel")} for="areaInput">
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
            <label className={cx("itemLabel")} for="costInput">
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
            <label className={cx("itemLabel")} for="amountInput">
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
              <label for="city">Tỉnh/Thành phố</label>
              <select id="city">
                <option value="" selected>
                  <Plus />
                  <p>--Chọn Tỉnh/Thành phố--</p>
                </option>
              </select>
            </div>
            <div className={cx("select", "addr")}>
              <label for="city">Quận/Huyện</label>
              <select id="city">
                <option value="" selected>
                  --Chọn Quận/Huyện--
                </option>
              </select>
            </div>
            <div className={cx("select", "addr")}>
              <label for="city">Xã/Phường</label>
              <select id="city">
                <option value="" selected>
                  --Chọn Xã/Phường--
                </option>
              </select>
            </div>
            <div className={cx("addr")}>
              <label for="addressInput">
                Số nhà, đường
              </label>
              <input
                type="text"
                className={cx("itemInput")}
                placeholder="Nhập số nhà, đường..."
                name="addressInput"
                id="addressInput"
                style={{boxShadow: "0px 0px 0px 1px #DCDFE4"}}
              />
            </div>
          </div>
        </div>
        <div className={cx("formItem")}>
          <label className={cx("itemLabel")} for="inforInput">
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
          <label className={cx("itemLabel")} for="descInput">
            Mô tả phòng
          </label>
          <textarea
            className={cx("itemInput")}
            placeholder="Nhập mô tả chi tiết"
            name="descInput"
            id="descInput"
            rows={2}
            style={{resize: "none"}}
          ></textarea>
        </div>
        <div className={cx("uploadImgs")}>
          Click to browse or<br/> drag and drop your files
        </div>
        <div className="wrapFull">
          <button className={cx("btn")} type="button" id="post">
            ĐĂNG BÀI
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostPage;
