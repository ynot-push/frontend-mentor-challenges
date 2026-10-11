import styles from "./card.module.css";
import { Link } from 'react-router-dom';

function Card({ colorElement, colorText, ...props }) {
  return (
    <Link to={`/country/${props.name}`}>
      <div className={styles.Card} style={{ backgroundColor: colorElement, color: colorText }}>
        <div className={styles.img_container}>
          <img src={props.flag} alt={`${props.name} flag`} className={styles.map_img} />
        </div>

        <div className={styles.countryyes_info} >
          <p className={styles.name_country} style={{color: colorText}}>{props.name}</p>
          <p className={styles.infos} style={{color: colorText}}>
            <span className={styles.infos_title} style={{color: colorText}}>Population</span>: {props.population.toLocaleString()}
          </p>
          <p className={styles.infos} style={{color: colorText}}>
            <span className={styles.infos_title} style={{color: colorText}}>Region</span>: {props.region}
          </p>
          <p className={styles.infos} style={{color: colorText}}>
            <span className={styles.infos_title} style={{color: colorText}}>Capital</span>: {props.capital}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
