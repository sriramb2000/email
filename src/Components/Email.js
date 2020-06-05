import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Flexbox from 'flexbox-react';

import { Format, Shorten } from '../Logic';


export default function Email() {
    return (
        <Row>
            <Col xs={0} md={1.5} lg={3}/>
            <Col>
                <EmailForm/>
            </Col>
            <Col xs={0} md={1.5} lg={3}/>
        </Row>
    )
}

const EmailForm = () => {
    const { handleSubmit, register, errors } = useForm();
    const [linkLoading, setLinkLoading] = useState(true);
    const [link, setLink] = useState("");
    const onSubmit = (values) => {
        let { url } = Format(values);
        setLinkLoading(true);
        Shorten(url).then((res, err) => {
            setLinkLoading(false);
            if (err) {
                setLink(err);
            } else {
                setLink(res);
            }
        })
    }
    const emailListRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25}(;[ ]*([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})*$/i;

    return (
        <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                *To:
                </Form.Label>
                <Col sm={10}>
                <Form.Control 
                name="recipients"
                placeholder="Please enter as a semicolon separated list."
                ref={register({
                required: "A Recipient is required",
                pattern: {
                    value: emailListRegex,
                    message: 'shit'
                }
                })}/>
                </Col>
                {errors.recipients && errors.recipients.message}
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Bcc:
                </Form.Label>
                <Col sm={10}>
                <Form.Control 
                name="cc"
                placeholder="Please enter as a semicolon separated list."
                ref={register({
                pattern: {
                    value: emailListRegex,
                    message: 'shit'
                }
                })}/>
                </Col>
                {errors.cc && errors.cc.message}
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Cc:
                </Form.Label>
                <Col sm={10}>
                <Form.Control 
                name="bcc"
                placeholder="Please enter as a semicolon separated list."
                ref={register({
                pattern: {
                    value: emailListRegex,
                    message: 'shit'
                }
                })}/>
                </Col>
                {errors.bcc && errors.bcc.message}
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Subject:
                </Form.Label>
                <Col sm={10}>
                <Form.Control 
                name="subject"
                ref={register()}/>
                </Col>
                {errors.subject && errors.subject.message}
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Body:
                </Form.Label>
                <Col sm={10}>
                <Form.Control 
                name="body"
                ref={register()}
                as="textarea"
                rows="10"/>
                </Col>
                {errors.body && errors.body.message}
            </Form.Group>

            <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Create Link</Button>
                </Col>
            </Form.Group>
        </Form>
        <Row>
            {(!linkLoading) && <DisplayLink url={link}/>}
        </Row>
        </Container>
    )
}

const DisplayLink = ({url}) => {
    return (
        <a href={url}>
            {url}
        </a>
    )
}