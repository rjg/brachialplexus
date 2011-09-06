/*globals BP d3*/

BP = {};

BP.TabManager = {
  initTabs: function() {
    var tabContainers = $('div.tabs > div');
    $('div.tabs ul.tabNavigation a').click(function () {
        tabContainers.hide().filter(this.hash).show();

        $('div.tabs ul.tabNavigation a').removeClass('selected');
        $(this).addClass('selected');
                
        if ($(this).text() == "Quiz") {
          $("#schematic").hide();
        } else {
          $("#schematic").show();
        }
        
        return false;
    }).filter(':first').click();
                
  }
};

BP.QuizManager = {
  currentQuestion: 0,
  totalQuestions: 12,
  
  showHint: function(){
    var i = this.currentQuestion;
    $("#question"+i).children('.hint').show();
  },
  
  checkAnswer: function(answer, classList){
    if (classList.contains("correct")) {      
      answer.css('background-color', '#D5FFCA')
            .css('border-top', '1px solid #CADBA7')
            .css('border-bottom', '1px solid #CADBA7');      
    }else if (classList.contains("incorrect")){
      answer.css('background-color', '#FFD7D8')
            .css('border-top', '1px solid #F9BAC7')
            .css('border-bottom', '1px solid #F9BAC7');
      
      this.showHint();
    }
  },
  
  showNextQuestion: function(){    
    if (this.currentQuestion < this.totalQuestions-1) {
      $('.question').hide();
      this.currentQuestion++;
      $('#question'+this.currentQuestion).show();      
    }
    
  },
  
  showPreviousQuestion: function(){    
    if (this.currentQuestion > 0) {
      $('.question').hide();
      this.currentQuestion--;
      $('#question'+this.currentQuestion).show();      
    }
  },
  
  initQuiz: function() {
    $('.question').hide(); // Hide all questions
    $('.hint').hide(); // Hide all hints
    $('#question0').show(); // Show first question

    $('#next-question').click(function() {
      BP.QuizManager.showNextQuestion();
    });    
    $('#previous-question').click(function() {
      BP.QuizManager.showPreviousQuestion();
    });    

    $('#start-over').click(function() {
      // Make this work.
    });
    $(".answer").click(function() {
      var classList = this.classList;
      BP.QuizManager.checkAnswer($(this), classList);        
    });
  }
};

BP.ZoomPanManager = {
  initZoomPan: function() {
    var svg, svg1;
    function redraw() {
      svg.selectAll("g").attr("transform","translate(" + d3.event.translate + ")" + "scale(" + d3.event.scale + ")");    
    }    
    svg = d3.select("#b").call(d3.behavior.zoom().on("zoom", redraw));    
  }
};

BP.HighlightManager = {
    
  highlight: function(id){
    switch (id) {
      case "upper_trunk": 
        $("#green").attr('fill', "yellow").attr('stroke', 'red');        
        break;
      case "middle_trunk": 
        $("#blue").attr('fill', "yellow").attr('stroke', 'red');
        break;
      case "lower_trunk": 
        $("#black").attr('stroke', "red");
        break;

      default:         
        break;
    }
  },
  
  unhighlight: function(id){
    switch (id) {
      case "upper_trunk": 
        $("#green").attr('fill', "#76B74A").attr('stroke', '#000');
        break;
      case "middle_trunk": 
        $("#blue").attr("fill", "#4E94A0").attr('stroke', "#000");
        break;
      case "lower_trunk": 
        $("#black").attr('stroke', "#000");
        break;
        
      default: 
        console.log("default");
        break;
    }
  },
  
  initHighlighting: function(){
    var highlight   = this.highlight,
        unhighlight = this.unhighlight;
    $("#schematic g").mouseenter(function() {
      var id = this.id;
      $(this).children("polygon").attr('fill', "red");
      highlight(id);      
    }).mouseleave(function() {
      var id = this.id;
      $(this).children("polygon").attr('fill', "#FF993F");
      unhighlight(id);
    });
  }
};

BP.FullscreenManager = {
  initFullscreen: function(){
    (function () {
      var f = d3.select(document.body),
          c = d3.select("#anterior").style("visibility", "visible"),
          b = false,
          a = c.append("svg:svg").attr("width", 32).attr("height", 32).style("position", "absolute").style("right", "-16px").style("top", "-16px").style("visibility", "visible").on("mousedown", d);
          a.append("svg:circle").attr("cx", 16).attr("cy", 16).attr("r", 14).attr("fill", "#fff").attr("stroke", "#ccc").attr("stroke-width", 4).append("svg:title").text("Click to go fullscreen.");
      var e = a.append("svg:path").attr("transform", "translate(16,16)rotate(-45)scale(5)translate(-1.85,0)").attr("d", "M0,0L0,.5 2,.5 2,1.5 4,0 2,-1.5 2,-.5 0,-.5Z").attr("pointer-events", "none").attr("fill", "#aaa");
      var schematic = d3.select("#schematic");

      function d() {
        if (b = !b) {
          c.style("position", "fixed").style("border-width", 0).style("width", "100%").style("height", "100%").style("top", 0).style("left", 0);
          a.style("position", "fixed").style("right", "16px").style("top", "16px");
          e.attr("transform", "translate(16,16)rotate(135)scale(5)translate(-1.85,0)");
          f.style("visibility", "hidden").style("overflow", "hidden");
        } else {
          c.style("position", null).style("border-width", null).style("width", null).style("height", null).style("top", null).style("left", null);
          a.style("position", "absolute").style("right", "-16px").style("top", "-16px");
          e.attr("transform", "translate(16,16)rotate(-45)scale(5)translate(-1.85,0)");
          f.style("visibility", null).style("overflow", null);
        }
      }


    })();    
  }
};

$(function () {
  BP.TabManager.initTabs();  
  BP.QuizManager.initQuiz();
  BP.ZoomPanManager.initZoomPan();
  BP.HighlightManager.initHighlighting();
  BP.FullscreenManager.initFullscreen();
});

