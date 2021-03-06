import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors'

import logoImg from '../../assets/logo.svg'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
     const formRef = useRef<FormHandles>(null)
     const handleSubmit = useCallback(async (data: object) => {
          try {
               formRef.current?.setErrors({});
               const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    email: Yup.string().required('E-mail Obrigatório').email(),
                    password: Yup.string().min(6, 'No mínimo 6 dígitos'),
               });

               await schema.validate(data, {
                    abortEarly: false,
               });
          } catch (error) {
               const errors = getValidationErrors(error);
               formRef.current?.setErrors(errors)
          }
     }, []);

     return (
          <Container>
               <Background />
               <Content>
                    <img src={logoImg} alt="GoBarber" />
                    <Form ref={formRef} onSubmit={handleSubmit}>
                         <h1>Faça seu Cadastro</h1>
                         <Input name="name" icon={FiUser} type="text" placeholder="Nome" />
                         <Input name="email" icon={FiMail} type="text" placeholder="E-mail" />
                         <Input name="password" icon={FiLock} type="password" placeholder="Password" />
                         <Button type="submit">Cadastrar</Button>
                    </Form>
                    <a href="login">
                         <FiArrowLeft />
                    Voltar para Logon
               </a>
               </Content>
          </Container>
     )
}

export default SignUp;