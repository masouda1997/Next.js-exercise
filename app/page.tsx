import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
	return (
		//
		<main className={styles.main}>
			<h3> Home🔷Page </h3>
			<p>
				<Link href="/users">Users</Link>
			</p>
		</main>
	);
}
