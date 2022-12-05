import { memo } from "react";
import {
  EyeFill,
  StarFill,
  PencilFill,
  TrashFill,
} from "react-bootstrap-icons";
import { Divider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import styles from "./style.module.css";

const theme = createTheme({
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          width: "50%",
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

function MyUploadItem({ data, onDelete }) {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.wrapper}>
        <div className={styles.imgbox}>
          <img className={styles.img} src={data.image[0]} alt="Room imgae" />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.title}>
              <p className={styles.address}>
                {data.district + ", " + data.province}
              </p>
              <span className={styles.name}>{data.title}</span>
            </div>
          </div>
          <Divider />
          <div className={styles.footer}>
            <div className={styles.eval}>
            {(data.ratingPoint != null) ? data.ratingPoint.$numberDecimal : 0  }              
              <StarFill color="#00A699" size={12} />
              <p>{data.ratingCount.toString()} đánh giá</p>
            </div>
          </div>
        </div>
        <div className={styles.pricebox}>
          <p
            style={{
              fontWeight: 400,
              fontSize: "1.4rem",
              lineHeight: "2rem",
            }}
          >
            <span className={styles.price}>
              {data.price.toLocaleString("it-IT", {
                style: "currency",
                currency: "VND",
              })}
            </span>{" "}
            /tháng
          </p>
        </div>
        <div className={styles.tools}>
          <PencilFill className={styles.tool} />
          <Link to={`/detail/${data._id}`}>
            <EyeFill className={styles.tool} />
          </Link>

          <TrashFill className={styles.tool} onClick={onDelete} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default memo(MyUploadItem);
