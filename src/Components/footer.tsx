import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'; // faGithub 아이콘 import
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { SFlexLogo } from './CategoryFont';

const Container = styled.div`
  margin: 0px 200px 50px 200px;
  align-items: center;
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: space-between;
`;
const VerticalLine = styled.div`
  height: 80px; /* 세로 선의 높이 설정 */
  width: 1px; /* 세로 선의 너비 설정 */
  background-color: #ccc; /* 세로 선의 색상 설정 */
  margin: 0 20px; /* 세로 선의 좌우 여백 설정 */
`;
const Logo = styled(motion.svg)`
  width: 100px;
  height: 30px;
  fill: ${(props) => props.theme.red};
  path {
    stroke: white;
  }
`;

const GitLogo = styled(FontAwesomeIcon)`
  font-size: 30px;
`;

const Velog = styled(FontAwesomeIcon)`
  font-size: 30px;
  color: ${(props) => props.theme.white.lighter};
`;

const Explain = styled.p`
  font-size: 13px;
  text-align: start;
`;

const LinkIcon = styled.div`
  display: flex;
  align-items: center;

  a {
    color: inherit; /* 링크의 색상을 상위 요소에서 상속받도록 설정 */
    text-decoration: none; /* 링크의 밑줄 제거 */
    margin-right: 15px;
  }

  img {
    width: 30px; /* 이미지의 크기 조정 */
    margin-right: 15px;
  }
`;

const Footer = () => {
  return (
    <Container>
      <Logo width="50" height="15" viewBox="0 0 41.998 13.222">
        {SFlexLogo}
      </Logo>
      <VerticalLine />
      <Explain>
        S-FLEX(주) | 대표이사: 이서연 <br /> 서울시 강서구 화곡동
      </Explain>
      <Explain>
        고객센터: 0906-1104 <br />
        대표 메일: lsy_0906@naver.com <br />
        제휴 문의: lsy_0906@naver.com
      </Explain>

      <LinkIcon>
        <a
          href="https://github.com/seoyeon1123"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitLogo icon={faGithub} />
        </a>
        <a
          href="https://velog.io/@leeeee/posts"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Velog icon={faHome} />
        </a>
      </LinkIcon>
    </Container>
  );
};

export default Footer;
