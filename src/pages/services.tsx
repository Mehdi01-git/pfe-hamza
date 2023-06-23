import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "~/components/Navbar";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { Form } from "react-bootstrap";
import { Formik } from "formik";
import Link from "next/link";
import type { Posts, User } from "@prisma/client";
import { Trash2 } from "lucide-react";

interface Props {
  modal: boolean;
  id:
    | (Posts & {
        User: User;
      })
    | null;
}

const Services = () => {
  const [show, setShow] = useState<Props>({
    modal: false,
    id: null,
  });

  const handleClose = () =>
    setShow({
      modal: false,
      id: null,
    });
  const handleShow = () =>
    setShow({
      modal: true,
      id: null,
    });
  const { user } = useUser();
  const { data: allPosts, refetch: refetchPosts } =
    api.example.getAllPosts.useQuery();
  const { data: dataUser } = api.example.postUser.useQuery({
    id: user?.id || "",
    emailAddress: (user?.primaryEmailAddress?.emailAddress as string) || "",
    fullName: (user?.fullName as string) || "",
    imageUrl: (user?.profileImageUrl as string) || "",
  });
  const {
    mutateAsync: createPost,
    isLoading: pending,
    isSuccess: posted,
  } = api.example.createPost.useMutation();
  const {
    mutateAsync: editPost,
    isLoading: pendingEdit,
    isSuccess: postedEdit,
  } = api.example.editPost.useMutation();
  const { mutateAsync: deletePost } = api.example.deletePost.useMutation();

  return (
    <div>
      <title>Task.io</title>
      <Navbar />

      <div className="Post">
        <div className="service">
          {
            <Image
              className="service-img"
              src={"/S-2.jpg"}
              alt="cover"
              width={2000}
              height={500}
            />
          }
          <div className="service-text">
            <h1>Services</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatibus, ipsum laborum temporibus facere <br />
              consequatur fuga a aut aperiam dicta labore laudantium cupiditate
              dolorum ea explicabo delectus impedit ab aliquid odit. Lorem ipsum
              dolor sit amet consectetur, adipisicing elit. Voluptatibus, ipsum
              laborum temporibus facere consequatur fuga a aut aperiam dicta
              labore laudantium cupiditate dolorum ea explicabo delectus impedit
              ab aliquid odit.
            </p>
          </div>
        </div>
        <div className="postsTitle">
          <h1>Available Services</h1>
          <button onClick={handleShow} className="createbtn">
            Create Service
          </button>
          <Modal size="lg" show={show.modal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {show.id ? "Edit" : "Create"} your service
              </Modal.Title>
            </Modal.Header>
            {user && (
              <Formik
                initialValues={{
                  title: show.id ? show.id.title : "",
                  desc: show.id ? show.id.desc : "",
                  userId: user.id,
                }}
                onSubmit={async (values, actions) => {
                  console.log(values);
                  show.id
                    ? await editPost({
                        desc: values.desc as string,
                        id: show.id.id,
                        title: values.title as string,
                      })
                    : await createPost({
                        desc: values.desc as string,
                        title: values.title as string,
                        userId: user.id,
                      });
                  await refetchPosts();
                  if (posted) {
                    setShow({
                      modal: false,
                      id: null,
                    });
                  }
                  if (postedEdit) {
                    setShow({
                      modal: false,
                      id: null,
                    });
                  }

                  actions.setSubmitting(false);
                }}
              >
                {({ handleChange, handleSubmit, values }) => (
                  <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          name="title"
                          onChange={handleChange}
                          type="text"
                          defaultValue={values.title as string}
                          required
                          placeholder="Enter Title"
                        />
                        <Form.Text className="text-muted">
                          Give your service a title.
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Service Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="desc"
                          defaultValue={values.desc as string}
                          required
                          onChange={handleChange}
                          type="text"
                          placeholder="Description"
                        />
                      </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        disabled={pending || pendingEdit}
                        variant="primary"
                        type="submit"
                      >
                        Save Changes
                      </Button>
                    </Modal.Footer>
                  </Form>
                )}
              </Formik>
            )}
          </Modal>
        </div>

        <div className="cardsGrid">
          {allPosts?.map((item, i) => {
            return (
              <div key={i} className="card">
                <div className="image-content">
                  <span className="overlay"></span>

                  <div className="card-image">
                    <Image
                      src={item.User.imageUrl ? item.User.imageUrl : "/P2.jpg"}
                      alt=""
                      width={150}
                      height={150}
                      className="card-img"
                    />
                  </div>
                </div>
                <div className="card-content">
                  <h2 className="name">{item.User.fullName}</h2>
                  <h3 className="title">{item.title}</h3>
                  <p className="description">{item.desc}</p>
                  <div className="flex w-full items-center justify-center">
                    {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
                    <Link href={`mailto:${item.User.emailAddress}`}>
                      <button className="getincontactbtn">
                        GET IN CONTACT
                      </button>
                    </Link>
                    {item.User.id === user?.id && (
                      <div className="flex items-center gap-2">
                        <Formik
                          initialValues={{
                            delete: false,
                          }}
                          onSubmit={async (values, actions) => {
                            console.log(values);
                            await deletePost(item.id);
                            await refetchPosts();
                            actions.setSubmitting(false);
                          }}
                        >
                          {({ handleSubmit }) => (
                            <Form>
                              <Trash2
                                style={{
                                  color: "#c2d938",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleSubmit()}
                              />
                            </Form>
                          )}
                        </Formik>
                        <div
                          onClick={() =>
                            setShow({
                              modal: true,
                              id: item,
                            })
                          }
                          style={{
                            color: "white",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-edit"
                          >
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
