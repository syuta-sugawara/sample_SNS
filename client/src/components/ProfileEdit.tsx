import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import InputFile from '../components/InputFile';
import { fetchPutCurrentUser } from '../store/auth/actions';
import STYLES from '../styles/const';
import { PutCurrentUserType } from '../types/auth';
import { UserType } from '../types/user';
import CloseIcon from './icons/CloseIcon';
import Button, { Variant } from './Button';
import InputText from './InputText';

type Props = {
  user: UserType;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const ProfileEdit: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>(props.user.screenName);
  const [comment, setComment] = useState<string>(props.user.comment);
  const [iconUrl, setIconUrl] = useState<string>(props.user.iconUrl);
  const [headerUrl, setHeaderUrl] = useState<string>(props.user.headerUrl);
  const [iconImg, setIconImg] = useState<File>();
  const [headerImg, setHeaderImg] = useState<File>();

  const handleSave = () => {
    const formData: PutCurrentUserType = {
      screenName: name,
      comment,
      iconImg: iconImg as File,
      headerImg: headerImg as File,
    };
    dispatch(fetchPutCurrentUser(formData));
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleChangeIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    if (target.files !== null && target.files.length > 0) {
      const file: File = target.files.item(0) as File;
      setIconImg(file);
      const reader = new FileReader();
      reader.onload = e => {
        setIconUrl(e!.target!.result as string);
      };
      reader.readAsDataURL(file);
      console.log(file);
    }
  };

  const handleChangeHeader = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    if (target.files !== null && target.files.length > 0) {
      const file: File = target.files.item(0) as File;
      setHeaderImg(file);
      const reader = new FileReader();
      reader.onload = e => {
        setHeaderUrl(e!.target!.result as string);
      };
      reader.readAsDataURL(file);
      console.log(file);
    }
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
          <InputFile onChange={handleChangeHeader} />
        </HeaderImage>
        <ProfileImageWrapper>
          <ProfileImage>
            <img src={iconUrl} alt="" />
            <InputFile onChange={handleChangeIcon} />
          </ProfileImage>
        </ProfileImageWrapper>
        <TextForm>
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

const Wrapper = styled.div`
  width: 600px;
  background-color: ${STYLES.COLOR.WHITE};
  border-radius: 12px;
`;

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
  position: relative;
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
