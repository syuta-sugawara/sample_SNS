import React, { useState } from 'react';
import styled from 'styled-components';

import STYLES from '../styles/const';
import CloseIcon from './icons/CloseIcon';
import Button, { Variant } from './Button';
import InputText, { Validation } from './InputText';

type Props = {
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const ProfileEdit: React.FC<Props> = props => {
  // todo: 変更前のプロフィール情報をstoreから引っ張ってきてstateにつっこむ
  const [name, setName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [iconUrl, setIconUrl] = useState<string>('');
  const [headerUrl, setHeaderUrl] = useState<string>('');

  const handleSave = () => {
    // todo: 保存処理
    console.log(12222);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleChangeIconUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIconUrl(e.target.value);
  };

  const handleChangeHeaderUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderUrl(e.target.value);
  };

  return (
    <Wrapper>
      <Head>
        <CloseButton onClick={props.onClose}>
          <CloseIcon />
        </CloseButton>
        <ButtonWrapper>
          <Button
            text="保存"
            variant={Variant.CONTAINED}
            onClick={handleSave}
          />
        </ButtonWrapper>
      </Head>
      <Body>
        <HeaderImage>
          <img src={headerUrl} alt="" />
        </HeaderImage>
        <ProfileImageWrapper>
          <ProfileImage>
            <img src={iconUrl} alt="" />
          </ProfileImage>
        </ProfileImageWrapper>
        <TextForm>
          <InputText
            label="バナー画像のURL"
            placeholder="バナー画像のURL"
            value={headerUrl}
            validation={Validation.IMAGE}
            onChange={handleChangeHeaderUrl}
          />
          <InputText
            label="アイコン画像のURL"
            placeholder="アイコン画像のURL"
            value={iconUrl}
            validation={Validation.IMAGE}
            onChange={handleChangeIconUrl}
          />
          <InputText
            label="名前"
            placeholder="名前を追加"
            limit={50}
            value={name}
            onChange={handleChangeName}
          />
          <InputText
            label="自己紹介"
            placeholder="自己紹介を追加"
            limit={160}
            value={comment}
            onChange={handleChangeComment}
          />
        </TextForm>
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 53px;
  padding: 0 10px;
`;

const CloseButton = styled.button`
  width: 38px;
  height: 38px;
  padding: 8px;
  border-radius: 50%;
  &:hover {
    background-color: ${STYLES.COLOR.PRIMARY_LIGHTER_30};
  }
  &:active {
    background-color: ${STYLES.COLOR.PRIMARY_LIGHTER_20};
  }
  svg {
    width: 100%;
    height: 100%;
    fill: ${STYLES.COLOR.PRIMARY};
  }
`;

const ButtonWrapper = styled.div`
  width: 80px;
  height: 35px;
`;

const Body = styled.div`
  padding: 20px 15px 30px;
`;

const HeaderImage = styled.div`
  height: 200px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileImageWrapper = styled.div``;

const ProfileImage = styled.div`
  position: absolute;
  border: solid 3px ${STYLES.COLOR.WHITE};
  border-radius: 50%;
  transform: translateY(-75%);
  img {
    width: 140px;
    height: 140px;
    border-radius: 50%;
  }
`;

const TextForm = styled.div`
  padding-top: 50px;
`;

export default ProfileEdit;
