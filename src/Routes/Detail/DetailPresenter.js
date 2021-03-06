import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ItemContainer = styled.div`
  margin-bottom:15px;
`;

const Item = styled.span`

`;

const Divider = styled.span`
  margin: 0px 15px;
`;

const OverView = styled.p`
  opacity:0.7;
  width:50%;
`;

const Video = styled.div`
  margin-top: 23px;
  height: 70%;
  width: 70%;
`;


const DetailPresenter = ({ result, loading }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>{result.original_title 
          ? result.original_title 
          : result.original_name}
          </Title>
          <ItemContainer>
            <Item> 
              {result.release_date 
              ? result.release_date.substring(0, 4) 
              : result.first_air_date.substring(0, 4) }
            </Item>
            <Divider>
              ???
            </Divider>
            <Item>
                {result.runtime ? result.runtime : result.episode_run_time} Min
            </Item>
            <Divider>???</Divider>
            <Item>
                {result.genres 
                && result.genres.map((genre, index) => index === result.genres.length - 1
                  ? genre.name
                  : `${genre.name} / `)}
            </Item>
            <Divider>???</Divider>
            <Item>
              <span role="img" aria-label="emoji">??????</span>{result.vote_average}

            </Item>
          </ItemContainer>
          <OverView>
            {result.overview}
          </OverView>
          <Video>
          <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${result.videos.results[0].key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            
          </Video>
        </Data>
      </Content> 
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default DetailPresenter;
