import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Format, Shorten } from '../Logic';
import DisplayLink from './DisplayLink';


export default function Email() {
    return (
        <Row>
            <Col xs={0} lg={2}/>
            <Col>
                <EmailForm/>
            </Col>
            <Col xs={0} lg={2}/>
        </Row>
    )
}

const EmailForm = () => {
    const { handleSubmit, register, errors } = useForm();
    const [linkLoading, setLinkLoading] = useState(true);
    const [link, setLink] = useState("");
    const [url, setUrl] = useState("");
    const onSubmit = (values) => {
        let temp = Format(values).url;
        setLinkLoading(true);
        Shorten(temp).then((res, err) => {
            setLinkLoading(false);
            if (err) {
                setLink(err);
            } else {
                setLink(res);
                setUrl(temp);
            }
        })
    }
    const emailListRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25}(;[ ]*([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})*$/i;
    const emailPlaceholder = "Use semicolons to separate emails."

    return (
        <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                *To:
                </Form.Label>
                <Col sm={7}>
                <Form.Control 
                name="recipients"
                placeholder={emailPlaceholder}
                ref={register({
                required: "A Recipient is required",
                pattern: {
                    value: emailListRegex,
                    message: 'Please enter valid email(s)'
                }
                })}/>
                </Col>
                <Form.Text muted>
                    {errors.recipients && errors.recipients.message}
                </Form.Text>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Cc:
                </Form.Label>
                <Col sm={7}>
                <Form.Control 
                name="cc"
                placeholder={emailPlaceholder}
                ref={register({
                pattern: {
                    value: emailListRegex,
                    message: 'Please enter valid email(s)'
                }
                })}/>
                </Col>
                <Form.Text muted>
                    {errors.cc && errors.cc.message}
                </Form.Text>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={2}>
                Bcc:
                </Form.Label>
                <Col sm={7}>
                <Form.Control 
                name="bcc"
                placeholder={emailPlaceholder}
                ref={register({
                pattern: {
                    value: emailListRegex,
                    message: 'Please enter valid email(s)'
                }
                })}/>
                </Col>
                <Form.Text muted>
                    {errors.bcc && errors.bcc.message}
                </Form.Text>
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
            </Form.Group>

            <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                <Button variant="dark" type="submit">Create Link</Button>
                </Col>
            </Form.Group>
            <DisplayLink label='Link:' url={link}/>
            <DisplayLink label='Full Link:' url={url}/>        
        </Form>
        </Container>
    )
}

