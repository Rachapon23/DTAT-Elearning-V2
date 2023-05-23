import React from 'react'

const PublicCourse = ({ course, topic }) => {
    return (

        <div className="container ">
            {course &&
                <>
                    {course.image
                        ? <div className="card mt-3">
                            <img src={`${process.env.REACT_APP_IMG}/${course.image}`} width="100%" className="img-size-student card-img-top" />
                            <div className="card-body">
                                <div className="mt-3 px-2">
                                    <h3 className="card-title mb-3 fw-bold">{course.name}</h3>
                                    <p className="card-text fs-6">Detail : {course.description}</p>

                                </div>
                            </div>
                        </div>
                        :
                        <div className="card mt-3">
                            <div className="card-body alert-primary">
                                <div className="mt-3 px-2 text-dark">
                                    <h3 className="card-title mb-3 fw-bold">{course.name}</h3>
                                    <p className="card-text fs-6">Detail : {course.description}</p>
                                </div>
                            </div>
                        </div>
                    }
                </>
            }
            {course.enabled
                ? <div>
                    <div className="border bg-white my-3 ">
                        {topic && topic?.map((item, index) => (
                            <div key={index} className="px-5 mt-4">
                                <h5 id="titleTopic" className="fw-bold">{item?.title}</h5>

                                <div className="">
                                    <p className="fs-6">{item.description}</p>
                                    {item?.text?.length > 0 &&
                                        <div className="">
                                            <ul>
                                                {item?.text?.map((ttem, tdex) =>

                                                    <li className="fs-6" key={tdex}>
                                                        {ttem.content}
                                                    </li>

                                                )}
                                            </ul>
                                        </div>
                                    }
                                    {item?.link?.length > 0 &&
                                        <div className="container">
                                            {item?.link?.map((ttem, tdex) =>
                                                ttem.url.includes("youtube.com") ?
                                                    (
                                                        <div key={tdex} className="mb-2 d-flex justify-content-center">
                                                            <iframe
                                                                width="560"
                                                                height="315"
                                                                src={ttem.url.replace("watch?v=", "embed/")}
                                                                title="YouTube video player"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                allowFullScreen
                                                            />
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        ttem?.url?.includes("youtu.be") ?
                                                            (
                                                                <div key={tdex} className="mb-2 d-flex justify-content-center">
                                                                    <iframe
                                                                        width="560"
                                                                        height="315"
                                                                        src={ttem.url.replace(".be/", "be.com/embed/")}
                                                                        title="YouTube video player"
                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                        allowFullScreen
                                                                    />
                                                                </div>
                                                            )
                                                            :
                                                            (
                                                                <li key={tdex}>
                                                                    <a className='text-info' href={ttem.url}><i className="bi bi-link"></i>&nbsp;{ttem.name}</a>
                                                                </li>
                                                            )


                                                    )

                                            )}


                                        </div>
                                    }
                                    {item?.file?.length > 0 &&
                                        <div className="">


                                            {item?.file?.map((ttem, tdex) =>

                                                <div key={tdex} className="mb-2">
                                                    {ttem.filetype === 'image/jpeg'
                                                        ? <div className="container">
                                                            <div className="d-flex justify-content-center">
                                                                <div className="w-50">
                                                                    <img src={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="w-100" />
                                                                </div>
                                                            </div>

                                                        </div>
                                                        :
                                                        <>
                                                            {ttem.filetype === 'application/pdf'
                                                                ? <div>
                                                                    <a href={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="text-danger size-pdf">
                                                                        <i className="bi bi-file-earmark-pdf"></i> {ttem.name}</a>
                                                                </div>
                                                                :
                                                                <>
                                                                    {ttem.filetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                                        ? <div>
                                                                            <a href={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="text-primary">
                                                                                <i className="bi bi-file-earmark-word"></i> {ttem.name}</a>
                                                                        </div>
                                                                        :
                                                                        <>
                                                                            {ttem.filetype === "image/png"
                                                                                ? <div className="container">
                                                                                    <div className="d-flex justify-content-center">
                                                                                        <div className="w-50">
                                                                                            <img src={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="w-100" />
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                                : <>
                                                                                    {ttem.filetype == "image/webp"
                                                                                        ? <div className="container">
                                                                                            <div className="d-flex justify-content-center">
                                                                                                <div className="w-50">
                                                                                                    <img src={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="w-100" />
                                                                                                </div>
                                                                                            </div>

                                                                                        </div>
                                                                                        :

                                                                                        <>
                                                                                            {ttem.filetype == "video/mp4"
                                                                                                ? <div className="container">
                                                                                                    <div className="d-flex justify-content-center">
                                                                                                        <video className="w-75" controls>
                                                                                                            <source src={`${process.env.REACT_APP_IMG}/${ttem.filename}`}
                                                                                                                type={ttem.filetype} />
                                                                                                            Your browser does not support the video tag.
                                                                                                        </video>

                                                                                                    </div>

                                                                                                </div>
                                                                                                :
                                                                                                <>
                                                                                                    {ttem.filetype === "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                                                                                                        ? <div>
                                                                                                            <a href={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="text-warning">
                                                                                                                <i className="bi bi-filetype-ppt"></i> {ttem.name}</a>
                                                                                                        </div>
                                                                                                        :
                                                                                                        <>

                                                                                                            <div>
                                                                                                                <a href={`${process.env.REACT_APP_IMG}/${ttem.filename}`} className="text-success">
                                                                                                                    <i className="bi bi-file-arrow-down"></i> {ttem.name}</a>
                                                                                                            </div>
                                                                                                        </>
                                                                                                    }
                                                                                                </>
                                                                                            }
                                                                                        </>
                                                                                    }
                                                                                </>
                                                                            }
                                                                        </>
                                                                    }
                                                                </>
                                                            }
                                                        </>
                                                    }

                                                </div>

                                            )}

                                        </div>
                                    }

                                </div>


                                <hr className="mt-5 mb-4 text-secondary" />
                            </div>
                        ))}
                    </div>


                </div>
                :
                <div className="border bg-white my-3 p-4">
                    <p className="text-center text-info pt-3">This course is now not available, plase try again later</p>
                </div>
            }




        </div>
    )
}

export default PublicCourse