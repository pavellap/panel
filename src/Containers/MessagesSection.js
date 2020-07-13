import React from "react";
import MessagesTemplate from "../components/Templates/MessagesTemplate";
import PageHeader from "../components/UI/PageHeader";
import styled from "styled-components";

const Wrapper = styled.section`
  position: relative;
`

const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  div {
      padding: 20px;
      border: 1px solid lightgray;
  }
`


export default class extends React.Component {
    sections = {
        2: 'Главное меню и оплата',
        3: 'Анкета',
        4: 'Сообщение перед концом подписки',
        5: 'Отправка подарочных сертификатов',
        6: 'Остальное'
    }
    constructor(props) {
        super(props);
        this.state = {
            currentSection: 2,
        }
    }
    render() {
        return (
            <Wrapper>
                <PageHeader title={this.sections[this.state.currentSection]}/>
                <SectionWrapper>
                    {Object.keys(this.sections).map(item => <div>{this.sections[item]}</div>)}
                </SectionWrapper>
                <MessagesTemplate title={this.sections[this.state.currentSection]}
                sectionId={this.state.currentSection}/>
            </Wrapper>
        )
    }
}