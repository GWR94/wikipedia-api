import React from "react";
import { ArticleProps } from "../interfaces/article.i";

export default class Article extends React.Component<ArticleProps, {}> {
  private extractRef = React.createRef<HTMLDivElement>();

  public componentDidMount(): void {
    const { extract } = this.props;
    if (this.extractRef.current) this.extractRef.current.innerHTML = extract;
  }

  public render(): JSX.Element {
    const { pageid, title, link } = this.props;
    return (
      <div
        key={pageid}
        role="button"
        tabIndex={0}
        className="article__container animate__animated fadeInLeft"
        onClick={
          link
            ? (): Window => {
                return window.open(
                  link,
                  "_blank",
                  "noopener noreferrer"
                ) as Window;
              }
            : undefined
        }
      >
        <h1 className="article__title">{title}</h1>
        <div className="article__extract" ref={this.extractRef} />
      </div>
    );
  }
}
