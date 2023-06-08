const express = require(`express`);
const bodyparser = require(`body-parser`);
const cors = require(`cors`);
const mysql = require(`mysql`);
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyparser.json());


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '06062001',
    database: 'student',
    connectionLimit: 10,
});

pool.getConnection(err => {
    if (err) { console.log(err, 'poolerr'); }
    console.log('database connected...');
})



app.get('/selectcourse/:id', (req, res) => {
    let courseid = req.params.id;
    let qr = `select  * from course where courseid = '${courseid}'`;

    pool.query(qr, (err, result) => {
        if (err) {
            console.log(err, `errs`);
        }
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result
            });
        }
    })
});

// app.get('/topics/:courseid', (req, res) => {

//     let courseid = req.params.courseid;
//     let qr = `select topics from topics_table where courseid= '${courseid}';`;

//     pool.query(qr, (err, result) => {
//         if (err) {
//             console.log(err, `errs`);
//         }
//         if (result.length > 0) {
//             res.send({
//                 message: 'all user data',
//                 data: result,
//             });
//         }
//         else {
//             res.send(
//                 {
//                     message: "data not found"
//                 }
//             )
//         }
//     })
// });

app.get("/courseId/:id", (req, res) => {

    let courseid = req.params.id;
    console.log(courseid, "courseid");
    let qr = `select topicid,topics from topics_table where courseid= '${courseid}';`;

    pool.query(qr, (err, result) => {
        if (err) {
            console.log(err, `errs`);
        }
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result,
            });
        }
        else {
            res.send(
                {
                    message: "data not found"
                }
            )
        }
    })
});

app.get("/topicId/:id", (req, res) => {

    let topicid = req.params.id;
    // console.log(courseid, "courseid");
    let qr = `select topicid,task_id,Problem,Constraints,Input,expected_output from task where topicid= '${topicid}';`;

    pool.query(qr, (err, result) => {
        if (err) {
            console.log(err, `errs`);
        }
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result,
            });
        }
        else {
            res.send(
                {
                    message: "data not found"
                }
            )
        }
    })
});

app.get('/practice/:subtopic_id', (req, res) => {

    let subtopicid = req.params.subtopic_id;
    let qr = `select question,program,output,Prac_ans from practice,practice_ques,subtopic where subtopic.topicid=101 and subtopic.subtopicid=practice.subtopicid and practice.subtopicid='${subtopicid}' and practice.practice_id=practice_ques.practice_id;`;

    pool.query(qr, (err, result) => {
        if (err) {
            console.log(err, `errs`);
        }
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result,
            });
        }
        else {
            res.send(
                {
                    message: "data not found"
                }
            )
        }
    })
});

app.get('/quiz/:topic_id', (req, res) => {

    let topicid = req.params.topic_id;
    let qr = `select question,optiona,optionb,optionc,optiond,answer from quiz,topics_table where topics_table.topicid=quiz.topicid and quiz.topicid='${topicid}'`;

    pool.query(qr, (err, result) => {
        if (err) {
            console.log(err, `errs`);
        }
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result,
            });
        }
        else {
            res.send(
                {
                    message: "data not found"
                }
            )
        }
    })
});

app.get('/codetest/:topic_id', (req, res) => {

    let topicid = req.params.topic_id;
    let qr = `select code_ques,ans,ques from code_test,topics_table where code_test.topicid=topics_table.topicid and code_test.topicid='${topicid}';`;

    pool.query(qr, (err, result) => {
        if (err) {
            console.log(err, `errs`);
        }
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result,
            });
        }
    })
});

app.get('/subtopic1/:topic_id/:subtopic_id', (req, res) => {

    let topicid = req.params.topic_id;
    let subtopicid = req.params.subtopic_id;
    console.log(topicid);

    let qr = `select subtopicname,contents from subtopic,content_table,topics_table where topics_table.topicid=subtopic.topicid and topics_table.topicid=101 and subtopic.subtopicid='${subtopicid}' and subtopic.subtopicid=content_table.subtopicid;`;

    pool.query(qr, (err, result) => {
        if (err) {
            console.log(err, `errs`);
        }
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result
            });
        }
    })
});


app.get('/getnote', (req, res) => {

    let qr = `select noteid, notes,timer from note,video where note.video_id = video.video_id and note.video_id =1; `;

    pool.query(qr, (err, result) => {
        if (err) {
            console.log(err, `errs`);
        }
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result
            });
        }
    })
});


app.get('/topics', (req, res) => {

    let qr = `select   topics from course , topics_table where course.courseid=topics_table.courseid and topics_table.courseid=1; `;

    pool.query(qr, (err, result) => {
        if (err) {
            console.log(err, `errs`);
        }
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result
            });
        }
    })
});


app.get('/code_content/:topic_id/:subtopic_id', (req, res) => {

    let topicid = req.params.topic_id;
    let subtopicid = req.params.subtopic_id
    let qr = `select program,contents from code,code_content,topics_table where topics_table.topicid=code.topicid and topics_table.topicid='${topicid}'and code_content.codeid=code.codeid and code.subtopicid = '${subtopicid}'`;

    pool.query(qr, (err, result) => {
        if (err) {
            console.log(err, `errs`);
        }
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result
            });
        }
    })
});


app.get('/video', (req, res) => {

    let qr = `select * from video  `;

    pool.query(qr, (err, result) => {
        if (err) {
            console.log(err, `errs`);
        }
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result
            });
        }
    })
});


app.get('/task/:topic_id', (req, res) => {

    let topicid = req.params.topic_id;
    let qr = `select Problem,Constraints,Input,expected_output from topics_table,task where topics_table.topicid=task.topicid and topics_table.topicid='${topicid}'`;

    pool.query(qr, (err, result) => {
        if (err) {
            console.log(err, `errs`);
        }
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result
            });
        }
    })
});

//get single data

// app.get('/user2/:id', (req, res) => {

//     let gId = req.params.id;
//     let qr = `select * from code where codeid =${gId}`;

//     pool.query(qr, (err, result) => {
//         if (err) {
//             console.log(err, `errs`);
//         }
//         if (result.length > 0) {
//             res.send({
//                 message: 'all user data',
//                 data: result
//             });
//         }
//         else {
//             res.send({
//                 message: 'data not found'
//             });
//         }
//     })
// });


//admin

app.get('/admincourse', (req, res) => {
    let qr = `select  * from course`;

    pool.query(qr, (err, result) => {
        if (err) {
            console.log(err, `errs`);
        }
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result
            });
        }
    })
});


app.get('/admintopics', (req, res) => {
    let qr = `select   * from topics_table `;

    pool.query(qr, (err, result) => {
        if (err) {
            console.log(err, `errs`);
        }
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result
            });
        }
    })
});


app.get('/adminsubtopics', (req, res) => {
    let qr = `select * from subtopic`;

    pool.query(qr, (err, result) => {
        if (err) {
            console.log(err, `errs`);
        }
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result
            });
        }
    })
});


app.get('/adminQuiz', (req, res) => {
    let qr = `select * from quiz`;

    pool.query(qr, (err, result) => {
        if (err) {
            console.log(err, `errs`);
        }
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result
            });
        }
    })

});


app.get('/adminTask', (req, res) => {
    let qr = `select * from task`;

    pool.query(qr, (err, result) => {
        if (err) {
            console.log(err, `errs`);
        }
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result
            });
        }
    })

});


app.get('/admincontent', (req, res) => {
    let qr = `select  * from content_table;`;

    pool.query(qr, (err, result) => {
        if (err) {
            console.log(err, `errs`);
        }
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result
            });
        }
    })
});


app.get('/chat', (req, res) => {
    let qr = `select  * from chat;`;

    pool.query(qr, (err, result) => {
        if (err) {
            console.log(err, `errs`);
        }
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result
            });
        }
    })
});


//create data

app.post('/topics', (req, res) => {
    console.log(req.body, 'createdata');

    let courseid = req.body.courseid;
    let topics = req.body.topics;

    let qr = `insert into topics_table(courseid,topics)
               values('${courseid}','${topics}')`;
    console.log(qr, 'qr')
    pool.query(qr, (err, result) => {
        if (err) { console.log(err); }
        console.log(result, 'result')
        res.send({
            message: 'data inserted',
        });
    });
});


app.post('/contents', (req, res) => {
    console.log(req.body, 'createdata');
    let subtopicid = req.body.subtopicid;
    let contents = req.body.contents;

    let qr = `insert into content_table(subtopicid,contents)
               values('${subtopicid}','${contents}')`;
    console.log(qr, 'qr')
    pool.query(qr, (err, result) => {
        if (err) { console.log(err); }
        console.log(result, 'result')
        res.send({
            message: 'data inserted',
        });
    });
});


app.post('/course', (req, res) => {
    console.log(req.body, 'createdata');

    let programming_course = req.body.programming_course;

    let qr = `insert into course(programming_course)
               values('${programming_course}')`;
    console.log(qr, 'qr')
    pool.query(qr, (err, result) => {
        if (err) { console.log(err); }
        console.log(result, 'result')
        res.send({
            message: 'data inserted',
        });
    });
});

app.post('/subtopics', (req, res) => {
    console.log(req.body, 'createdata');

    let topicid = req.body.topicid;
    let subtopicname = req.body.subtopicname;

    let qr = `insert into subtopic(topicid,subtopicname)
               values('${topicid}','${subtopicname}')`;
    console.log(qr, 'qr')
    pool.query(qr, (err, result) => {
        if (err) { console.log(err); }
        console.log(result, 'result')
        res.send({
            message: 'data inserted',
        });
    });
});


app.post('/adminquiz', (req, res) => {
    console.log(req.body, 'createdata');

    let topicid = req.body.topicid;
    let question = req.body.question;
    let optiona = req.body.optiona;
    let optionb = req.body.optionb;
    let optionc = req.body.optionc;
    let optiond = req.body.optiond;
    let answer = req.body.answer;

    let qr = `insert into quiz(topicid,question,optiona,optionb,optionc,optiond,answer)
               values('${topicid}','${question}','${optiona}','${optionb}','${optionc}','${optiond}','${answer}')`;
    console.log(qr, 'qr')
    pool.query(qr, (err, result) => {
        if (err) { console.log(err); }
        console.log(result, 'result')
        res.send({
            message: 'data inserted',
        });
    });
});


app.post('/admintask', (req, res) => {
    console.log(req.body, 'createdata');

    let topicid = req.body.topicid;
    let question = req.body.question;
    let constraints = req.body.constraints;
    let input = req.body.input;
    let expected_output = req.body.expected_output;

    let qr = `insert into task(topicid,Problem,Constraints,Input,expected_output)
               values('${topicid}','${question}','${constraints}','${input}','${expected_output}')`;
    console.log(qr, 'qr')
    pool.query(qr, (err, result) => {
        if (err) { console.log(err); }
        console.log(result, 'result')
        res.send({
            message: 'data inserted',
        });
    });
});

//
app.post('/createmsg', (req, res) => {
    console.log(req.body, 'createdata');

    let studentside = req.body.studentside;

    let qr = `insert into chat(studentside)
    values('${studentside}')`;
    console.log(qr, 'qr')
    pool.query(qr, (err, result) => {
        if (err) { console.log(err); }
        console.log(result, 'result')
        res.send({
            message: 'data inserted',
        });
    });
});


//

app.post('/createnotes', (req, res) => {
    console.log(req.body, 'createdata');

    let notes = req.body.notes;
    let timer = req.body.timer;
    let video_id = req.body.video_id;

    let qr = `insert into note(notes,timer,video_id)
               values('${notes}','${timer}',${video_id})`;
    console.log(qr, 'qr')
    pool.query(qr, (err, result) => {
        if (err) { console.log(err); }
        console.log(result, 'result')
        res.send({
            message: 'data inserted',
        });
    });
});


//update 
app.put('/user/:id', (req, res) => {
    console.log(req.body, 'updatedata');

    let cid = req.params.id;
    let contents = req.body.contents;

    let qr = `update student set contents='${contents}' where id =${cid} `;
    pool.query(qr, (err, result) => {
        if (err) { console.log(err); }

        res.send({
            message: 'data updated',
        });

    });
});

//delete
app.delete('/note/:id', (req, res) => {

    let cid = req.params.id;

    let qr = `delete from note where noteid='${cid}' `;
    pool.query(qr, (err, result) => {
        if (err) { console.log(err); }

        res.send({
            message: 'data deleted',
        });
    });
})


app.delete('/deleteCourse/:id', (req, res) => {

    let cid = req.params.id;

    let qr = `delete from course where courseid='${cid}' `;
    pool.query(qr, (err, result) => {
        if (err) { console.log(err); }

        res.send({
            message: 'data deleted',
        });
    });
})

//complie

app.post('/compile', (req, res) => {
    const { Program, Input } = req.body;

    axios.post('https://compiler-single-file-java-xffvl2khoq-uc.a.run.app/compile', {
        files: [
            {
                filename: "Main.java",
                content: Program,
                id: "main"
            }
        ],
        input: Input
    })
        .then(response => {
            // send the response data back to the client
            res.json(response.data);
        })
        .catch(error => {
            console.error(error);
            // send an error response back to the client
            res.status(500).json({ error: 'An error occurred' });
        });
});



app.listen(3000, () => {
    console.log(`server running`);
});
