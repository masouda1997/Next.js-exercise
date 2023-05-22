import React from "react";

type Props = {
	promise: Promise<Post[]>;
};

export default async function UserPost({ promise }: Props) {
	const posts = await promise;

	const content = posts.map((post) => {
		return (
			<article style={{ margin: "auto 20px" }} key={post.id}>
				<h2 style={{ color: "green" }}>
					{post.id}-{post.title}
				</h2>
				<p style={{ color: "lightGreen" }}>{post.body}</p>
				<br />
			</article>
		);
	});

	return content;
}
