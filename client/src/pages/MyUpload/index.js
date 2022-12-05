import { useState, useEffect, useCallback } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Divider, Button, Modal } from "@mui/material";
import MyUploadItem from "../../components/MyUploadItem";
import styles from "./style.module.css";
import { UserState } from "../../Context/UserProvider";
import { useSnackbar } from "notistack";
import axiosClient from '../../api/axiosClient.js';

const theme = createTheme({
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          width: "100%",
          marginBottom: "30px",
          marginTop: "30px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "15px",
          fontSize: "12px",
          fontFamily: '"Inter", sans-serif',
          fontWeight: 600,
          height: "42px",
          color: "white",
        },
      },
    },
  },
  palette: {
    bkmotel: {
      main: "#00A699",
    },
    defaultBtn: {
      main: "#ccc",
    },
  },
});

function MyUploadPage() {
  const { userInfo } = UserState();
  const [isChanged, setIsChanged] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [myRooms, setMyRooms] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const handleDeleteAll = () => {
    axiosClient
      .post("/api/rooms/deleteallmyrooms", { creator: userInfo._id }, config)
      .then((res) => {
        setMyRooms([]);
        setIsChanged(!isChanged);
        toast(res.data.message, "success");
      })
      .catch((error) => toast(error.response.data.message, "error"));
  };

  const handleDelete = useCallback(
    (room) => {
      axiosClient
        .post("/api/rooms/deletebyid", { _id: room._id }, config)
        .then((res) => {
          setIsChanged(!isChanged);
          toast(res.data.message, "success");
        })
        .catch((err) => toast(err.response.data.message, "error"));
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    axiosClient
      .post(
        `/api/rooms/myrooms`,
        {
          creator: userInfo._id,
        },
        config
      )
      .then((data) => {
        setMyRooms(data.data);
      })
      .catch((error) => {
        toast(error.response.data.message, "error");
      });
    // eslint-disable-next-line
  }, [isChanged, myRooms]);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <div className={styles.heading}>
            <div className={styles.header}>Bài đăng của tôi</div>
            <button
              className={styles.deleteAllBtn}
              onClick={() => {
                if (myRooms.length) setModalOpen(true);
              }}
            >
              Xoá tất cả
            </button>
            <Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className={styles.modal}>
                <header id="modal-modal-title" className={styles.modalHeader}>
                  Xác nhận xóa
                </header>
                <p id="modal-modal-description" className={styles.modalMessage}>
                  Bạn có chắc chắn muốn xóa ?
                </p>
                <div className={styles.modalFooter}>
                  <Button
                    variant="contained"
                    size="small"
                    color="bkmotel"
                    onClick={() => {
                      handleDeleteAll();
                      setModalOpen(false);
                    }}
                  >
                    Xác nhận
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="info"
                    onClick={() => setModalOpen(false)}
                  >
                    Hủy xóa
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
          <Divider variant="middle" />
          <div className={styles.listItem}>
            {!myRooms.length ? (
              <span style={{ fontSize: "20px" }}>Danh sách trống</span>
            ) : (
              myRooms.map((room) => (
                <MyUploadItem
                  key={room._id}
                  data={room}
                  onDelete={() => {
                    handleDelete(room, userInfo);
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MyUploadPage;
