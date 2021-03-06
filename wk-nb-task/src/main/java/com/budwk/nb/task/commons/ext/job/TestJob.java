package com.budwk.nb.task.commons.ext.job;

import com.alibaba.dubbo.config.annotation.Reference;
import com.budwk.nb.sys.services.SysTaskService;
import org.nutz.dao.Chain;
import org.nutz.dao.Cnd;
import org.nutz.ioc.loader.annotation.Inject;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.log.Log;
import org.nutz.log.Logs;
import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

/**
 * @author wizzer(wizzer@qq.com) on 2015/6/27.
 */
@IocBean
public class TestJob implements Job {

    private static final Log log = Logs.get();
    @Inject
    @Reference
    protected SysTaskService sysTaskService;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        JobDataMap data = context.getJobDetail().getJobDataMap();
        String taskId = context.getJobDetail().getKey().getName();
        String hi = data.getString("hi");
        log.info("Test Job hi::" + hi);
        sysTaskService.update(Chain.make("exeAt", System.currentTimeMillis()).add("exeResult", "执行成功"), Cnd.where("id", "=", taskId));
    }
}
