import React from "react";
import Link from "next/link";
import Style from "../../public/assets/css/footer.module.css";

function Footer() {
    const Categories = [
        {
            category: "News World",
            url: "/news-world",
        },
        {
            category: "Business",
            url: "/business",
        },
        {
            category: "Sports",
            url: "/sports",
        },
        {
            category: "Health",
            url: "/health",
        },
        {
            category: "Travel",
            url: "/travel",
        },
        {
            category: "Style",
            url: "/style",
        },
    ];
    return (
        <footer className={Style.footer}>
            <div className={Style.containerMenuList}>
                <div className={Style.MenuList}>
                    {Categories.map((list, i) => {
                        return (
                            <React.Fragment key={i}>
                                <div className={Style.lineList}>
                                    <Link href={list.url}>
                                        <a>{list.category}</a>
                                    </Link>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
