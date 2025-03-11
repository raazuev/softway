import styles from "./Spinner.module.scss";

export const Spinner = () => {
  return (
    <svg
      className={styles.img}
      viewBox="0 0 800 800"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={styles.spin}
        cx="400"
        cy="400"
        fill="none"
        r="182"
        stroke-width="40"
        stroke="#8c98d4"
        stroke-dasharray="770 1400"
        stroke-linecap="round"
      />
    </svg>
  );
};
