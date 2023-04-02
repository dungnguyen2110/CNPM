import styles from "./InfoOverviewMapDetail.module.scss";
import HeaderTable from "../HeaderTable";
import { Link } from "react-router-dom";
import images from "../../../../assets/images";

function regionInfo(nameRegion, area) {
  return (
    <div className={styles.regionInfo}>
      <Link to="/map/detail" className={styles.arrowback}>
        <img width="40" height="30" src={images.arrowback} alt="Trở lại"></img>
      </Link>
      <div className={styles.regionInfoElement}>
        <span className={styles.pdr10}>Tên vùng:</span>
        <span>{nameRegion}</span>
      </div>
      <div className={styles.regionInfoElement}>
        <span className={styles.pdr10}>Diện tích</span>
        <span>{area}</span>
      </div>
    </div>
  );
}

function infoElement(attr, value, isLink) {
  return (
    <div className={styles.infoElement}>
      <span>{attr}</span>
      <span>{value}</span>
      {isLink && (
        <Link className={styles.viewInfo} to="./">
          Xem thông tin
        </Link>
      )}
    </div>
  );
}

function btnRoad(name1, class1, name2, class2) {
  return (
    <div className={`${styles.RouteBtns} ${styles.mt16}`}>
      <div className={`${styles.RouteBtn} ${styles.leftBtn} ${class1}`}>
        {name1}
      </div>
      <div className={`${styles.RouteBtn} ${styles.rightBtn} ${class2}`}>
        {name2}
      </div>
    </div>
  );
}

function MDetail() {
  const infoElements = [
    infoElement("Người thu gom:", "A", true),
    infoElement("Thời gian:", "7:30 - 9:00"),
    infoElement("Chu trình:", "MCP1 -> MCP2 -> MCP3"),
    infoElement("Quảng đường", 20 + "km"),
  ];

  return (
    <div>
      <HeaderTable />
      <div className={styles.container}>
        {regionInfo("A", "1000km^2")}

        <div className={styles.regionContainer}>
          <div className={styles.regionTask}>
            <div className={styles.headerTitle}>Thông tin nhiệm vụ</div>
            {infoElements.length === 0 ? (
              <div className={styles.taskEmpty}>
                <div className={styles.mt10}>Vùng này không có Collector</div>
                <div className={styles.addTask}>
                  <img
                    className={styles.pdr10}
                    src={images.addicon}
                    alt="Thêm nhiệm vụ"
                  ></img>
                  Thêm nhiệm vụ
                </div>
              </div>
            ) : (
              <div className={styles.taskInfo}>
                <div>
                  {infoElements.map((element, index) => (
                    <div key={index}>{element}</div>
                  ))}
                </div>

                {btnRoad(
                  "Tôi ưu chu trình",
                  styles.optimizeColor,
                  "Chỉnh sửa chu trinh",
                  styles.editColor
                )}

                <hr className={styles.line} />

                {btnRoad(
                  "Chỉnh sửa chu trính",
                  styles.editColor,
                  "Xóa nhiệm vụ",
                  styles.deleteColor
                )}
              </div>
            )}
          </div>

          <div className={styles.regionMap}>
            <div className={styles.headerTitle}>Bản đồ vùng</div>
            <Link to="/taskjanitor" className={styles.mapDetail}></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MDetail;
