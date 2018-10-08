import { Component, OnInit } from '@angular/core';
import { GetQuestionsService } from './../get-questions.service';
import { SubmisssionsService } from './../submisssions.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  selectedBookmark = false;
  questions = [];
  questionList = [];
  optionList = [];
  bookindex = 0;
  answerSet = [{}];
  constructor(private questionService: GetQuestionsService, private submissions : SubmisssionsService) { }

  ngOnInit() {
    var params = {};
    params["id"] = this.getCookie("recruitments_portal_club");
    params["domain"] = this.getCookie("recruitments_portal_domain");
    console.log(params);
    this.questionService.getQuestion(params).subscribe((data) => {
      console.log(data);
      if (data.data) {
        this.questionList = data.data;
        this.optionList = data.options;
      }
      else {
        window.alert("invalid request");
      }

      for (var i = 1; i <= this.questionList.length; i++) {
        this.questions.push(i);
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  adapt(question) {

    console.log("adapt");
    question = Number(question);

    for (var i = 1; i <= this.questions.length; i++) {
      let qindex = "q" + i;
      let oindex = "o" + i;
      var bindex = "b" + i;
      if (i == question) {
        document.getElementById(qindex).style.display = "block";
        document.getElementById(oindex).style.display = "block";
        document.getElementById(bindex).style.display = "block";

        var element = document.getElementById(question);
        var style = window.getComputedStyle(element);
        var bcolors = style.getPropertyValue('background-color');
        console.log(bcolors);
        if (bcolors === "rgba(120, 255, 85, 0.6)" || bcolors === "rgba(255, 165, 0, 0.6)") {
          element.style.backgroundColor = "white";
        }
        else {
          document.getElementById(bindex).style.display = "block";
        }
      }
      else {

        document.getElementById(qindex).style.display = "none";
        document.getElementById(oindex).style.display = "none";
        document.getElementById(bindex).style.display = "none";

        question = Number(question);
        var bindex = "b" + (question);
        var element = document.getElementById(bindex);
        var style = window.getComputedStyle(element);
        var heights = style.getPropertyValue('height');
        var height = parseInt(heights);

      }


      if (question == this.bookindex && this.bookindex > 0) {
      }
      else if (this.bookindex > 0) {
        var index = String(this.bookindex)
        document.getElementById(index).style.backgroundColor = "rgba(255, 165, 0, 0.6)";
      }
    }
  }

  next(question) {
    console.log()
    question = Number(question);
    if (question+1 <= this.questions.length) {
      var bindex = "b" + (question);
      var qindex = "q" + (question);
      var oindex = "o" + (question);
      document.getElementById(qindex).style.display = "none";
      document.getElementById(oindex).style.display = "none";
      document.getElementById(bindex).style.display = "none";
      document.getElementById(question).style.backgroundColor = "rgba(120,255,85,0.6)";

      bindex = "b" + (question + 1);
      qindex = "q" + (question + 1);
      oindex = "o" + (question + 1);
      document.getElementById(qindex).style.display = "block";
      document.getElementById(oindex).style.display = "block";
      document.getElementById(bindex).style.display = "block";
    }

    // else {

    //   this.submit();
    // }
  }

  bookmark(question) {
    console.log("bookmark");
    question = Number(question);
    var bindex = "b" + (question);
    var element = document.getElementById(bindex);
    var style = window.getComputedStyle(element);
    var heights = style.getPropertyValue('height');
    var height = parseInt(heights);
    if (height == 50) {
      var bindex = "b" + (question);
      var qindex = "q" + (question);
      document.getElementById(bindex).style.height = "120px";
      document.getElementById(bindex).style.transition = "1s";
      document.getElementById(qindex).style.marginTop = "-70px";
      document.getElementById(qindex).style.transition = "1s";
      document.getElementById(question).style.backgroundColor = "white";
      this.bookindex = question;
    }
    else {
      var bindex = "b" + (question);
      var qindex = "q" + (question);
      document.getElementById(bindex).style.height = "50px";
      document.getElementById(bindex).style.transition = "1s";
      document.getElementById(qindex).style.marginTop = "0px";
      document.getElementById(qindex).style.transition = "1s";
      document.getElementById(question).style.backgroundColor = "white";
      this.bookindex = 0;
    }
  }

  submit() {
    console.log(this.answerSet);
    var params = {};
    params["email"] = window.sessionStorage.getItem("email_id");
    params["id"] = this.getCookie("recruitments_portal_club");
    params["domain"] = this.getCookie("recruitments_portal_domain");
    params["answers"] = this.answerSet;
    
    this.submissions.postAnswers(params).subscribe((data:any) => {
      console.log(data);
    },(error : any) => {
      console.log(error);
    })

  }

  opt1(question){
    question = Number(question);
    var answer = this.optionList[question-1].option1;
    var question_id = this.questionList[question-1].id;
    var obj = {};
    obj["id"] = question_id;
    obj["marked_answer"] = answer;
    if(this.answerSet[question-1]) {
      this.answerSet[question-1] = obj;
    }
    else {
      this.answerSet.push(obj);
    }
  }

  opt2(question){
    question = Number(question);
    var answer = this.optionList[question-1].option2;
    var question_id = this.questionList[question-1].id;
    var obj = {};
    obj["id"] = question_id;
    obj["marked_answer"] = answer;
    if(this.answerSet[question-1]) {
      this.answerSet[question-1] = obj;
    }
    else {
      this.answerSet.push(obj);
    }
  }
  opt3(question){
    question = Number(question);
    var answer = this.optionList[question-1].option3;
    var question_id = this.questionList[question-1].id;
    var obj = {};
    obj["id"] = question_id;
    obj["marked_answer"] = answer;
    if(this.answerSet[question-1]) {
      this.answerSet[question-1] = obj;
    }
    else {
      this.answerSet.push(obj);
    }
  }
  opt4(question){
    question = Number(question);
    var answer = this.optionList[question-1].option4;
    var question_id = this.questionList[question-1].id;
    var obj = {};
    obj["id"] = question_id;
    obj["marked_answer"] = answer;
    if(this.answerSet[question-1]) {
      this.answerSet[question-1] = obj;
    }
    else {
      this.answerSet.push(obj);
    }
  }
}

