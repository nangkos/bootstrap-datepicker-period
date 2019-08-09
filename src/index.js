// import $ from "jquery";
// import moment from "moment";
// import "bootstrap-datepicker";
// import "bootstrap-datepicker/dist/locales/bootstrap-datepicker.ko.min.js";

(function() {
  $(".input-group.date").datepicker({
    language: "ko",
    format: "yyyy-mm-dd",
    clearBtn: true,
    todayHighlight: true,
    autoclose: true
  });

  $('[data-toggle="period"]')
    .each(function(idx, el) {
      var _$self = $(el),
        _$start = _$self.find('[data-toggle="startdate"]'),
        _$end = _$self.find('[data-toggle="enddate"]');
      _$self.data({
        start: _$start,
        end: _$end
      });
      _$start.data("container", _$self);
      _$end.data("container", _$self);

      if (!_$start.datepicker("getDate")) {
        _$start.datepicker(
          "setDate",
          moment()
            .date(1)
            .format("YYYY-MM-DD")
        );
      }
      if (!_$end.datepicker("getDate")) {
        _$end.datepicker("setDate", moment().format("YYYY-MM-DD"));
      }
    })
    .on("setDate.dw.start", function(e, date) {
      var _$target = $(this).data("start");
      _$target.datepicker("setDate", date);
    })
    .on("setDate.dw.end", function(e, date) {
      var _$target = $(this).data("end");
      _$target.datepicker("setDate", date);
    })
    .on("setStart.dw.period", function(e, date) {
      var _$self = $(this),
        _$target = _$self.data("end");
      _$target.datepicker("setStartDate", date || "");
    })
    .on("setEnd.dw.period", function(e, date) {
      var _$self = $(this),
        _$target = _$self.data("start");
      _$target.datepicker("setEndDate", date || "");
    })
    .on("changeDate", '[data-toggle="startdate"]', function(e) {
      var _$container = $(this).data("container");
      _$container.trigger("setStart.dw.period", e.date);
    })
    .on("changeDate", '[data-toggle="enddate"]', function(e) {
      var _$container = $(this).data("container");
      _$container.trigger("setEnd.dw.period", e.date);
    })
    .on("click", '[data-toggle="assign"]', function(e) {
      if (e.isDefaultPrevented()) {
        return;
      }
      e.preventDefault();

      var _$self = $(this),
        _$container = _$self.parents('[data-toggle="period"]'),
        _value_ = _$self.data("value"),
        _start_ = "",
        _end_ = "";
      var _interval_ = parseInt(_value_, 10);
      switch (_interval_) {
        case 0:
        case -1:
          _start_ = moment()
            .add(_interval_, "d")
            .format("YYYY-MM-DD");
          _end_ = _start_;
          break;
        case 30:
          _start_ = moment()
            .date(1)
            .format("YYYY-MM-DD");
          _end_ = moment().format("YYYY-MM-DD");
          break;
        case 365:
          _start_ = moment()
            .dayOfYear(1)
            .format("YYYY-MM-DD");
          _end_ = moment().format("YYYY-MM-DD");
          break;
        default:
          break;
      }

      if (_interval_ === -1) {
        _$container
          .trigger("setDate.dw.start", _start_)
          .trigger("setDate.dw.end", _end_);
      } else {
        _$container
          .trigger("setDate.dw.end", _end_)
          .trigger("setDate.dw.start", _start_);
      }
    });
})();
