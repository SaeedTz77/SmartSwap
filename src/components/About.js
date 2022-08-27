import React, { PureComponent } from "react";
import data, { tokenDetails } from "../config/constantConfig";
import web3Config from "../config/web3Config";
import { PrePath } from "../constants";
import Collapse from "@kunukn/react-collapse";
import "../assets/AboutPopup.css"

export default class About extends PureComponent {
    constructor(props) {
        super();
        this.state = {
            web3: props.web3,
            web3Config: props.web3Config,
            coinList: tokenDetails,
            isOpen1: false,
            isOpen2: false
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            web3: newProps.web3,
            web3Config: newProps.web3Config
        })
    }

    componentDidMount() {
        // console.log(this.state.coinList)
    }

    toggle = index => {
        let collapse = "isOpen" + index;

        this.setState(prevState => ({ [collapse]: !prevState[collapse] }));
    };

    render() {

        return (
            <div className="main-Popup wallet-Popup" id="About">
                <div className="container-Grid">
                    <div className="LiProTitle01">About Us</div>
                    <div className="ppAboutText01"> Smart.exchange is a decentralized organization managed by a DAO community and created by Atom Foundation early 2017. The first published patent was in 2018 when there was no DeFi awareness. At this time, investors did not even know what slippage was so the solution pre-dated the problem. Now, with the emergence of AMMs, SmartSwap solves a known need in the industry.</div>


                   
                        <div className="previous-advisor-team-Box">
                            <div className="wrapper">
                                <div className="s20TeamContainer clearfix" id="previous_advisor">
                                    <div className="s20Teambox01 clearfix" data-102500-start="opacity:0; transform: scale(1.3) translate(0px, 0px);" data-103500-start="opacity:1; transform: scale(1) translate(0px, 0px);">
                                        <div className="s20ttextbox02">PREVIOUS Advisors</div>
                                    </div>
                                    <div className="s20Teambox01 clearfix" data-103000-start="opacity:0; transform: scale(1.3) translate(0px, 0px);" data-104000-start="opacity:1; transform: scale(1) translate(0px, 0px);">
                                        <div className="s20tImgbox ani-5">
                                            <div className="s20RotaterBox"><a href="# " target="_blank" rel="noopener noreferrer" className="teamLinkIcon"> </a>
                                                <div className="teamImgNPbox"><img className="  mCS_img_loaded" alt="" src="images/team/teamImg-09.png" /></div>
                                            </div>
                                            <div className="afterLogo"><img className="lozad mCS_img_loaded" data-src="https://www.jointer.io/images/jntr_about/advisors001_logo.png" alt=" " src="https://www.jointer.io/images/jntr_about/advisors001_logo.png" /> </div>
                                        </div>
                                        <div className="s20ttextbox"> <span>Professor Eric S. Maskin</span>Harvard University Nobel Memorial Prize in Economics Mechanism Design Expert </div>
                                    </div>
                                    <div className="s20Teambox01 clearfix" data-103500-start="opacity:0; transform: scale(1.3) translate(0px, 0px);" data-104500-start="opacity:1; transform: scale(1) translate(0px, 0px);">
                                        <div className="s20tImgbox ani-5">
                                            <div className="s20RotaterBox"><a href="# " target="_blank" className="teamLinkIcon" rel="noopener noreferrer"> </a>
                                                <div className="teamImgNPbox"><img className=" mCS_img_loaded" alt="" src="images/team/teamImg-010.png" /></div>
                                            </div>
                                            <div className="afterLogo"><img className="lozad mCS_img_loaded" data-src="https://www.jointer.io/images/jntr_about/advisors001_logo.png" alt="" src="https://www.jointer.io/images/jntr_about/advisors001_logo.png" /> </div>
                                        </div>
                                        <div className="s20ttextbox"> <span>Professor Alvin E. Roth</span>Stanford University Nobel Memorial Prize in Economics Market Design expert</div>
                                    </div>
                                    <div className="s20Teambox01 clearfix" data-104500-start="opacity:0; transform: scale(1.3) translate(0px, 0px);" data-105500-start="opacity:1; transform: scale(1) translate(0px, 0px);">
                                        <div className="s20tImgbox ani-5">
                                            <div className="s20RotaterBox"><a href="https://www.linkedin.com" target="_blank" className="teamLinkIcon" rel="noopener noreferrer"> </a>
                                                <div className="teamImgNPbox"><img className="lozad mCS_img_loaded" alt="" src="images/team/teamImg-011.png" /></div>
                                            </div>
                                            <div className="afterLogo"><img className="lozad mCS_img_loaded" data-src="https://www.jointer.io/images/jntr_about/t5-ss-V2.png" alt="" src="https://www.jointer.io/images/jntr_about/t5-ss-V2.png" /> </div>
                                        </div>
                                        <div className="s20ttextbox"> <span>Chris Cox</span>Former Chairman of the U.S. Securities and Exchange Comission [SEC] former U.S. Congress Member </div>
                                    </div>
                                    <div className="s20Teambox01 clearfix">
                                        <div className="s20tImgbox ani-5">
                                            <div className="s20RotaterBox"><a href="https://www.linkedin.com/in/daniel-p-ahn-7283967/" target="_blank" rel="noopener noreferrer" className="teamLinkIcon"> </a>
                                                <div className="teamImgNPbox"><img className="lozad mCS_img_loaded" alt="" src="images/team/teamImg-012.png" /></div>
                                            </div>
                                            <div className="afterLogo"><img className="lozad mCS_img_loaded" data-src="https://www.elementzero.network/api/private/mainSite/teamMember/7/t5-ss.png" alt="" src="https://www.elementzero.network/api/private/mainSite/teamMember/7/t5-ss.png" /> </div>
                                        </div>
                                        <div className="s20ttextbox"> <span>Daniel P. Ahn PhD</span>Chief Economist<br />
                                            U.S. Department of State </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        

                    </div>





                </div>














                <a href="javascript:void(0);" onClick={() => { this.props.closePopup("About") }} className="close-Icon"></a>
            </div>
        )

    }

}
