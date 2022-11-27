import { useState, useEffect, useCallback } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Divider, Button } from "@mui/material";
import MyUploadItem from "../../components/MyUploadItem";
import styles from "./style.module.css";
import { UserState } from "../../Context/UserProvider";
import { useSnackbar } from "notistack";
import axios from "axios";

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
  },
  palette: {
    bkmotel: {
      main: "#00A699",
    },
  },
});

function MyUploadPage() {
  const { userInfo } = UserState();
  const [isChanged, setIsChanged] = useState(false);
  // eslint-disable-next-line
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
    if (myRooms.length > 0) {
      if (window.confirm("Bạn muốn xoá tất cả bài viết?")) {
        axios
          .post(
            "/api/rooms/deleteallmyrooms",
            { creator: userInfo._id },
            config
          )
          .then((res) => {
            setMyRooms([]);
            setIsChanged(!isChanged);
            toast(res.data.message, "success");
          })
          .catch((error) => toast(error.response.data.message, "error"));
      }
    } else {
      toast("Dánh sách phòng trống", "error");
    }
  };

  const handleDelete = useCallback((room) => {
    if (window.confirm("Bạn muốn xoá bài viết này?")) {
      axios
        .post("/api/rooms/deletebyid", { _id: room._id }, config)
        .then((res) => {
          setIsChanged(!isChanged);
          toast(res.data.message, "success");
        })
        .catch((err) => toast(err.response.data.message, "error"));
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    axios
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
            <button className={styles.deleteAllBtn} onClick={handleDeleteAll}>
              Xoá tất cả
            </button>
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
                  onDelete={() => handleDelete(room, userInfo)}
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
