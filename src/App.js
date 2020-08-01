import React from 'react';
import { Helmet } from 'react-helmet'
import styles from './App.module.css';

import { iconList } from './iconList.js';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/pro-regular-svg-icons';

library.add(far)

const randomIcon = lst => {
    const ri = Math.floor(Math.random() * lst.length);
    return lst[ri];
};

function Button(props) {
    return (
        <button
            className={styles.Button}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.disabled ? props.disabledText : props.text}
        </button>
    );
}
function Generator(props) {
    return (
        <div className={styles.Generator}>
            {props.children}
        </div>
    );
}
function ContentCenterRow(props) {
    return (
        <div className={styles.ContentCenterRow}>
            {props.children}
        </div>
    );
}
function Paragraph(props) {
    return (
        <p className={styles.Paragraph}>
            {props.children}
        </p>
    );
}
function Title(props) {
    return (
        <h1 className={styles.Title}>
            {props.title}
        </h1>
    );
}
function ContentColumn(props) {
    return (
        <div className={styles.ContentColumn}>
          {props.children}
        </div>
    );
}
function Layout(props) {
    return (
        <div className={styles.Layout}>
            {props.children}
        </div>
    );
}
class App extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            spinning: false,
            icons: [
                "question",
                "question",
                "question"
            ]
        };
    }
    generateBtnClicked() {
        this.setState({spinning: true});
        this.randomIcons();
        const times = [250, 250, 250, 250];
        const next = index => {
            if (index < times.length) {
                setTimeout(() => {
                    this.randomIcons();
                    next(index + 1);
                }, times[index]);
            } else {
                this.setState({spinning: false});
            }
        };
        next(0);
    }
    randomIcons() {
        this.setState({
            icons: [
                randomIcon(iconList),
                randomIcon(iconList),
                randomIcon(iconList)
            ]
        });
    }
    render() {
        return (
            <Layout>
                <Helmet>
                  <meta charSet="utf-8" />
                  <title>IconIdeas</title>
                </Helmet>
                <ContentColumn>
                    <Title title="Icons are Ideas" />
                    <Paragraph>
                        Ever have a creative block? Are you in a hackathon right now? Need an idea for your next side project? Maybe you just want to see some cool icons?
                    </Paragraph>
                    <Paragraph>
                        Use the generator below to find your next idea! Your only job is to interpret the result.
                    </Paragraph>
                    <ContentCenterRow>
                        <Generator>
                            <FontAwesomeIcon
                                icon={["far", this.state.icons[0]]}
                                size="3x"
                            />
                        </Generator>
                        <Generator>
                            <FontAwesomeIcon
                                icon={["far", this.state.icons[1]]}
                                size="3x"
                            />
                        </Generator>
                        <Generator>
                            <FontAwesomeIcon
                                icon={["far", this.state.icons[2]]}
                                size="3x"
                            />
                        </Generator>
                    </ContentCenterRow>
                    <ContentCenterRow>
                        <Button
                            spinning={this.state.spinning}
                            disabled={this.state.spinning}
                            onClick={() => this.generateBtnClicked()}
                            text="Generate"
                            disabledText="Generating..."
                        />
                    </ContentCenterRow>
                </ContentColumn>
            </Layout>
        );
    }
}

export default App;
