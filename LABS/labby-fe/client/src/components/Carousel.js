import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import "./compstyle.css"
const CarouselComponent = (props) => {
    return ( 
        <div className="funStuff">
            <Carousel className="carousel" indicators={true} interval={5000}>
                <Carousel.Item>
                    <div className="farm">    
                    <img src='https://ca.slack-edge.com/T4JUEB3ME-UEM5YBTNJ-6971e8bf03da-72' alt="text"/>
                    <h3>Tyler Foreman</h3>
                    <p>Tyler is an amazing leader who always knows how to solve any conflicts that arise, and keeps the team focused and on track.</p>
                    <a href="https://github.com/tjforeman" rel="noopener noreferrer" target="_blank"><button>Github</button></a> 
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="farm">
                    <img src='https://ca.slack-edge.com/T4JUEB3ME-UFCQZEKFB-5c387ada94ad-72' alt="text"/>
                    <h3>York Cook</h3>
                    <p>York is life of the party, a great person to work with and an enthusiastic, reliable team member.</p>
                    <a href="https://github.com/yorkcook" rel="noopener noreferrer" target="_blank"><button>Github</button></a>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="farm">
                    <img src='https://ca.slack-edge.com/T4JUEB3ME-UGWDTGE2D-304822da85af-72' alt="text"/>
                    <h3>Laura Daugherty</h3>
                    <p>Laura Daugherty is a creative, action-oriented team player who gets the job done by doing whatever needs to be done to solve the problem.</p>
                    <a href="https://github.com/laura-daugherty" rel="noopener noreferrer" target="_blank"><button>Github</button></a>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="farm">
                    <img src='https://ca.slack-edge.com/T4JUEB3ME-UGFT04U6Q-897737d11303-72' alt="text"/>
                    <h3>Nate Magera</h3>
                    <p>Nate is always there when you need him, ready with technological knowledge or friendly assistance.</p>
                    <a href="https://github.com/nmagera07" rel="noopener noreferrer" target="_blank"><button>Github</button></a>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="farm">
                    <img src='https://ca.slack-edge.com/T4JUEB3ME-UGCGRFT2P-f2ff4fe456b5-72' alt="text"/>
                    <h3>Doc Jones</h3>
                    <p>Doc brings energy to our team, always pushing us to do our best.</p>
                    <a href="https://github.com/doc-jones" rel="noopener noreferrer" target="_blank"><button>Github</button></a>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="farm">
                     <img src='https://ca.slack-edge.com/T4JUEB3ME-UGGFY1C5A-0e7e5f400150-72' alt="text"/>
                        <h3>Edwin Parker</h3>
                        <p>Edwin Parker is a former NYC jazz musician and jazz professor who is currently full stack web development. He likes to focus on the backend languages like NodeJS and Python.</p>
                        <a href="https://github.com/weparkerjr" rel="noopener noreferrer" target="_blank"><button>Github</button></a>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="farm">
                        <img src='https://ca.slack-edge.com/T4JUEB3ME-UHNLF57NG-0e318399719b-72' alt="text"/>
                        <h3>Zach Imbriaco</h3>
                        <p>Zach a javascript wiz, helping the team overcome any technical issues that arise.</p>
                        <a href="https://github.com/vaeliwen" rel="noopener noreferrer" target="_blank"><button>Github</button></a>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                <div className="farm">
                    <img src="https://ca.slack-edge.com/T4JUEB3ME-UGGEENM52-2c89c17c2331-72" alt="pic"/>
                    <h3>Efrain Vazquez</h3>
                    <p>Efrain is a quick-witted software engineer studying at Lambda School. He’s always ready to overcome a challenge.</p>
                    <a href="https://github.com/efrainva"><button>Github</button></a>
                </div>
                </Carousel.Item>
            </Carousel>
        </div>
     );
}
 
export default CarouselComponent;