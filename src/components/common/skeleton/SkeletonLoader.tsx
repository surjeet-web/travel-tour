import React from "react";

export interface SkeletonLoaderProps {
  type?: "text" | "card" | "list" | "image" | "avatar" | "button" | "form";
  lines?: number;
  width?: string | number;
  height?: string | number;
  className?: string;
  animated?: boolean;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type = "text",
  lines = 1,
  width,
  height,
  className = "",
  animated = true,
}) => {
  const skeletonClass = `skeleton-loader ${type} ${animated ? "animated" : ""} ${className}`;

  const renderTextSkeleton = () => {
    return (
      <div className={skeletonClass} style={{ width: width || "100%" }}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className="skeleton-line"
            style={{
              width: index === lines - 1 ? "60%" : "100%",
              height: height || "1em",
            }}
          ></div>
        ))}
      </div>
    );
  };

  const renderCardSkeleton = () => {
    return (
      <div className={skeletonClass}>
        <div className="skeleton-card-image" style={{ height: height || "200px" }}></div>
        <div className="skeleton-card-content">
          <div className="skeleton-line" style={{ width: "80%", height: "1.2em" }}></div>
          <div className="skeleton-line" style={{ width: "60%", height: "1em" }}></div>
          <div className="skeleton-line" style={{ width: "40%", height: "1em" }}></div>
        </div>
      </div>
    );
  };

  const renderListSkeleton = () => {
    return (
      <div className={skeletonClass}>
        {Array.from({ length: lines || 3 }).map((_, index) => (
          <div key={index} className="skeleton-list-item">
            <div className="skeleton-avatar" style={{ width: "40px", height: "40px" }}></div>
            <div className="skeleton-list-content">
              <div className="skeleton-line" style={{ width: "70%", height: "1em" }}></div>
              <div className="skeleton-line" style={{ width: "50%", height: "0.8em" }}></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderImageSkeleton = () => {
    return (
      <div className={skeletonClass} style={{ width, height }}>
        <div className="skeleton-image"></div>
      </div>
    );
  };

  const renderAvatarSkeleton = () => {
    return (
      <div className={skeletonClass}>
        <div
          className="skeleton-avatar"
          style={{ width: width || "40px", height: height || "40px" }}
        ></div>
      </div>
    );
  };

  const renderButtonSkeleton = () => {
    return (
      <div className={skeletonClass}>
        <div
          className="skeleton-button"
          style={{ width: width || "120px", height: height || "36px" }}
        ></div>
      </div>
    );
  };

  const renderFormSkeleton = () => {
    return (
      <div className={skeletonClass}>
        {Array.from({ length: lines || 4 }).map((_, index) => (
          <div key={index} className="skeleton-form-group">
            <div
              className="skeleton-label"
              style={{ width: "30%", height: "0.8em" }}
            ></div>
            <div
              className="skeleton-input"
              style={{ width: "100%", height: "2.5em" }}
            ></div>
          </div>
        ))}
      </div>
    );
  };

  switch (type) {
    case "card":
      return renderCardSkeleton();
    case "list":
      return renderListSkeleton();
    case "image":
      return renderImageSkeleton();
    case "avatar":
      return renderAvatarSkeleton();
    case "button":
      return renderButtonSkeleton();
    case "form":
      return renderFormSkeleton();
    default:
      return renderTextSkeleton();
  }
};

export default SkeletonLoader;