import React from "react";
import Link from "next/link";

type Props = {
  title: string;
  buttonLabel: string;
  path: string;
};

function PageTitleWithAddButtonComponent({ title, buttonLabel, path }: Props) {
  return (
    <div className="title-right-actioin-btn-wrapper-product-list">
      <h3 className="title">{title}</h3>
      <div className="button-wrapper">
        <Link href={path} className="rts-btn btn-primary">
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
}

const PageTitleWithAddButton = React.memo(PageTitleWithAddButtonComponent);

export default PageTitleWithAddButton;
