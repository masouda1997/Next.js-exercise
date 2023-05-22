import React from "react";
import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import UserPost from "./components/UserPost";
import type { Metadata } from "next";
import getAllUsers from "@/lib/getAllUsers";
// approach 4
import { Suspense } from "react";

type Params = {
	params: {
		userId: string;
	};
};

// dynamic route I think its the 3rd  approach
export async function generateMetaData({
	params: { userId },
}: Params): Promise<Metadata> {
	const userData: Promise<User> = getUser(userId);
	const user = await userData;

	return {
		title: user.name,
		description: `this is the page of ${user.name}`,
	};
}

export default async function UserPage({ params: { userId } }: Params) {
	const userData: Promise<User> = getUser(userId);
	const userPostData: Promise<Post[]> = getUserPosts(userId);

	// approach 2
	// const [user, userPosts] = await Promise.all([userData, userPostData]);

	// approach 4
	const user = await userData;

	return (
		<>
			<h2 style={{ color: "red" }}>
				{user.id} - {user.name}
			</h2>
			<br />
			{/* approach 2 */}
			{/* <UserPosts posts={userPosts} /> */}

			{/* approach 4 */}
			<Suspense
				fallback={<h2 style={{ color: "yellow" }}>Loading...</h2>}
			>
				{/* line below is temperory base on Next Docs and in the future update we dont need this it cause dont check type for <UserPost promise={userPostData} />  */}

				{/* @ts-expect-error Server Component */}
				<UserPost promise={userPostData} />
			</Suspense>
		</>
	);
}

//********************* */ episode 4 *********************
// providing static params so from here Next.js knows what the parameter gonna be and create page without SSR and now its SSG

export async function generateStaticPrams() {
	const userData: Promise<User[]> = getAllUsers();
	const users = await userData;

	retun users.map(user=>({
		userId:user.id.toString()
	}))
}
