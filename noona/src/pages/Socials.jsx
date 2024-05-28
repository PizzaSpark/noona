import React from "react";
import NavBar from "../components/NavBar";
import { FacebookRounded } from "@mui/icons-material";

export default function Socials() {
    return (
        <div className="page-container">
            <NavBar />

            <div className="content">
                <h1>SOCIALS</h1>

                <div className="center">
                    <FacebookRounded
                        style={{ fontSize: 100, color: "#3b5998" }}
                        onClick={() =>
                            window.open(
                                "https://www.facebook.com/hiNoonacafe",
                                "_blank"
                            )
                        }
                    />
                    <div className="posts">
                        <iframe
                            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FhiNoonacafe%2Fposts%2Fpfbid0Rk49ZZhUsz58opszFNnjT1RVY2qL3JVytkpqourVqHZoeqvki2nuLWcdobdZfwUgl&width=750&show_text=true&height=609&appId"
                            width="750"
                            height="609"
                            style={{ border: "none", overflow: "hidden" }}
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        />

                        <iframe
                            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FhiNoonacafe%2Fposts%2Fpfbid02MfiuhmZ2TGdtwDbQo9wsLAT63VzkdhaU4KAwioqQA9mZRRjmJvzT534nCEzB7kTtl&width=750&show_text=true&height=609&appId"
                            width="750"
                            height="609"
                            style={{ border: "none", overflow: "hidden" }}
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        />

                        <iframe
                            src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FhiNoonacafe%2Fposts%2Fpfbid02d4QYkNkpwuAJAZmCLMxLg5bMCVZWiErTWnPGJbrD8B8CsKYApYJZUFgZCBdvvXCNl&width=750&show_text=true&height=589&appId"
                            width="750"
                            height="589"
                            style={{ border: "none", overflow: "hidden" }}
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
