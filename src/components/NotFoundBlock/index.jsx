import styles from './NotFoundBlock.module.scss'

function NotFoundBlock() {
	return (
		<h1 className={styles.root}>
			<span>404</span>
			<br />
			<p>Нічого не знайдено</p>
		</h1>
	)
}

export default NotFoundBlock
