import { ISeason } from '../../Api/TvApi';
import styled from 'styled-components';

// 스타일 정의
const Select = styled.select`
  width: 200px;
  padding: 10px;
  margin: 10px 10px;
  font-size: 16px;
  border: 1px solid ${(props) => props.theme.black.darker};
  border-radius: 5px;
  background-color: ${(props) => props.theme.black.veryDark};
  color: ${(props) => props.theme.white.lighter};
  appearance: none; // 기본 브라우저 스타일을 제거
  outline: none;
  cursor: pointer;
  top: -50px;
  position: relative;

  &:hover {
    border-color: ${(props) => props.theme.white.lighter};
  }
`;

const Option = styled.option`
  background-color: ${(props) => props.theme.black.darker};
  color: ${(props) => props.theme.white.lighter};
`;

interface ISeasonProps {
  seasons: ISeason[];
  onSeasonSelect: (seasonId: number) => void;
}

const SeasonSelector = ({ seasons, onSeasonSelect }: ISeasonProps) => {
  return (
    <Select onChange={(e) => onSeasonSelect(Number(e.target.value))}>
      <Option value="">Season</Option>
      {seasons.map((season) => (
        <Option key={season.id} value={season.id}>
          {season.name}
        </Option>
      ))}
    </Select>
  );
};

export default SeasonSelector;
