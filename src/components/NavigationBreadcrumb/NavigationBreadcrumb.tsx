
import { useTranslations } from "next-intl";
import Cookies from "js-cookie";
type Breadcrumb = {
  label: string;
  href: string;
  active?: boolean;
};

interface NavigationAreaProps {
  breadcrumbs: Breadcrumb[];
}

export default function NavigationArea({ breadcrumbs }: NavigationAreaProps) {
  const t = useTranslations("routes");
  const locale = Cookies.get("NEXT_LOCALE")||"ar";
  return (
    <>
      <div className="bg_light-1 navigator-breadcrumb-wrapper ">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex align-items-center gap-5 py-4">
                {breadcrumbs?.map((item, index) => (
                  <span key={index}>
                    <a href="/">{t("home")}</a>
                    <i
                      className={`fa-regular mx-4 fa-chevron-${
                        locale == "ar" ? "left" : "right"
                      } `}
                    />
                    <a
                      className={item.active ? "current" : ""}
                      href={item.href}
                    >
                      {item.label}
                    </a>
                    {index < breadcrumbs.length - 1 && (
                      <i
                        className={`fa-regular fa-chevron-${
                          locale == "ar" ? "left" : "right"
                        } mx-4`}
                      />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-seperator bg_light-1">
        <div className="container">
          <hr className="section-seperator" />
        </div>
      </div>
    </>
  );
}
