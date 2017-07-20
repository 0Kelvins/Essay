package com.like.controller;

import com.like.api.DTO.AuthorDTO;
import com.like.api.VO.InfoVO;
import com.like.entity.Essay;
import com.like.entity.Manager;
import com.like.entity.User;
import com.like.service.EssayService;
import com.like.service.PublishService;
import com.like.service.UserService;
import com.like.utils.FileDownload;
import com.like.utils.TipsConstant;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Like on 2017/3/7.
 */
@Controller
public class Common {

    @Resource
    private PublishService publishService;

    @Resource
    private EssayService essayService;

    @Resource
    private UserService userService;

    @RequestMapping("/home")
    public String goMain() {
        return "home/home";
    }

    @RequestMapping("/plate")
    public String goPlate() {
        return "plate/plate";
    }

    @RequestMapping("/about")
    public String goAbout() {
        return "about/about";
    }

    @RequestMapping("/resume")
    public String goResume() {
        return "resume/resume";
    }

    @RequestMapping("/loginRegister")
    public String goLoginOrRegister() {
        return "loginRegister/loginRegister";
    }

    @RequestMapping("/person")
    public ModelAndView goPerson(@RequestParam("id") Integer userId) {
        ModelAndView mv = new ModelAndView();
        AuthorDTO author = userService.getAuthor(userId);
        if (author != null) {
            if (author != null) {
                mv.setViewName("person/person");
                mv.addObject("author", author);
            }
        } else {
            InfoVO infoVO = new InfoVO(TipsConstant.requestError, TipsConstant.pleaseRetry);
            mv.setViewName("info/info");
            mv.addObject("info", infoVO);
        }
        return mv;
    }

    @RequestMapping("/write")
    public ModelAndView goWrite(HttpSession session) {
        ModelAndView mv = new ModelAndView();
        User user = (User) session.getAttribute("user");
        if (user != null) {
            mv.setViewName("edit/edit");
        } else {
            InfoVO infoVO = new InfoVO(TipsConstant.notLogin, TipsConstant.loginTips);
            mv.setViewName("info/info");
            mv.addObject("info", infoVO);
        }
        return mv;
    }

    @RequestMapping("/e")
    public ModelAndView goEssay(@RequestParam("id") Integer essayId) {
        ModelAndView mv = new ModelAndView();
        Essay essay = essayService.getEssayById(essayId);
        if (essay != null) {
            AuthorDTO author = userService.getAuthor(essay.getUserId());
            if (author != null) {
                mv.setViewName("view/view");
                mv.addObject("essay", essay);
                mv.addObject("author", author);

                publishService.addView(essayId);    //增加被访问次数
            }
        } else {
            InfoVO infoVO = new InfoVO(TipsConstant.essayOpenFail, TipsConstant.connectToAdmin);
            mv.setViewName("info/info");
            mv.addObject("info", infoVO);
        }
        return mv;
    }

    @RequestMapping("/c/imageUpload")
    public void uploadImages(HttpServletRequest request, HttpServletResponse response,
                             HttpSession session) throws IllegalStateException, IOException {
        User user = (User) session.getAttribute("user");    // 判断用户是否登录
        Manager manager = (Manager) session.getAttribute("manager");

        if (user == null && manager == null) {
            return;
        }

        //将当前上下文初始化给  CommonsMutipartResolver （多部分解析器）
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(
                request.getSession().getServletContext());

        String imageDir = "/images/upload/";
        //判断本地windows还是服务器linux
        String os = System.getProperty("os.name");
        String directory = imageDir;
        if(os.toLowerCase().startsWith("win")){
            directory = request.getSession().getServletContext().getRealPath(imageDir);
        }
        StringBuilder path = new StringBuilder(directory);
        path.append(File.separator);

        StringBuffer url = request.getRequestURL();
        String urlBase = url.substring(0, url.indexOf(request.getRequestURI())) + imageDir;

        //检查form中是否有enctype="multipart/form-data"
        if (multipartResolver.isMultipart(request)) {
            //将request变成多部分request
            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
            //获取multiRequest 中所有的文件名
            Iterator iter = multiRequest.getFileNames();

            List<String> imgFileNames = new ArrayList<>();

            while (iter.hasNext()) {
                //一次遍历所有文件
                MultipartFile file = multiRequest.getFile(iter.next().toString());
                if (file != null) {
                    //文件名称
                    String name = file.getOriginalFilename();
                    String fileName = new Date().getTime() + "_" +
                            name.substring(name.lastIndexOf('\\') + 1);

                    //保存文件
                    File dir = new File(String.valueOf(path));
                    if (!dir.exists() && !dir.isDirectory()) {
                        dir.mkdir();
                    }
                    file.transferTo(new File(path + fileName));

                    imgFileNames.add(fileName);
                }

            }

            response.addHeader("Access-Control-Allow-Origin", "*");
            response.setContentType("text/html; charset=UTF-8");
            OutputStream outputStream = response.getOutputStream();
            outputStream.write(imgFileNames.stream()
                    .map(fileName -> (urlBase + fileName))
                    .collect(Collectors.joining("\n"))
                    .getBytes("UTF-8"));

            outputStream.flush();
            outputStream.close();
            return;
        }
    }

    @RequestMapping("/download/{fileName}")
    @ResponseBody
    public void downLoadFile(@PathVariable(name = "fileName") String fileName,
                                 HttpServletRequest request, HttpServletResponse response) throws Exception {
        //获取下载路径
        String download = request.getSession().getServletContext().getRealPath("/resume/");

        FileDownload.downLoadFile(fileName, "doc", download, response);
    }

    @RequestMapping("/setting")
    public String goSetting() {
        return "setting/setting";
    }

    @RequestMapping("/setting/profile")
    public String goSettingProfile() {
        return "setting/profile";
    }

    @RequestMapping("/setting/misc")
    public String goSettingMisc() {
        return "setting/misc";
    }

}
