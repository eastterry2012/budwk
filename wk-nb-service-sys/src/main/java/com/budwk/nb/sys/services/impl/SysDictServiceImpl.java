package com.budwk.nb.sys.services.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.budwk.nb.sys.models.Sys_dict;
import com.budwk.nb.sys.services.SysDictService;
import com.budwk.nb.commons.base.service.BaseServiceImpl;
import org.nutz.aop.interceptor.async.Async;
import org.nutz.aop.interceptor.ioc.TransAop;
import org.nutz.dao.Chain;
import org.nutz.dao.Cnd;
import org.nutz.dao.Dao;
import org.nutz.dao.Sqls;
import org.nutz.ioc.aop.Aop;
import org.nutz.ioc.loader.annotation.IocBean;
import org.nutz.lang.Strings;
import org.nutz.plugins.wkcache.annotation.CacheDefaults;
import org.nutz.plugins.wkcache.annotation.CacheRemoveAll;
import org.nutz.plugins.wkcache.annotation.CacheResult;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.budwk.nb.commons.constants.RedisConstant.PLATFORM_REDIS_WKCACHE_PREFIX;


@IocBean(args = {"refer:dao"})
@Service(interfaceClass = SysDictService.class)
@CacheDefaults(cacheName = PLATFORM_REDIS_WKCACHE_PREFIX + "sys_dict")
public class SysDictServiceImpl extends BaseServiceImpl<Sys_dict> implements SysDictService {
    public SysDictServiceImpl(Dao dao) {
        super(dao);
    }

    /**
     * 通过code获取name
     *
     * @param code 字典标识
     * @return
     */
    @Override
    @CacheResult
    public String getNameByCode(String code) {
        Sys_dict dict = this.fetch(Cnd.where("code", "=", code));
        return dict == null ? "" : dict.getName();
    }

    /**
     * 通过id获取name
     *
     * @param id ID
     * @return
     */
    @Override
    @CacheResult
    public String getNameById(String id) {
        Sys_dict dict = this.fetch(id);
        return dict == null ? "" : dict.getName();
    }

    /**
     * 通过树path获取下级列表
     *
     * @param path 路径
     * @return
     */
    @Override
    @CacheResult
    public List<Sys_dict> getSubListByPath(String path) {
        return this.query(Cnd.where("path", "like", Strings.sNull(path) + "____").asc("location"));
    }

    /**
     * 通过父id获取下级列表
     *
     * @param id ID
     * @return
     */
    @Override
    @CacheResult
    public List<Sys_dict> getSubListById(String id) {
        return this.query(Cnd.where("parentId", "=", Strings.sNull(id)).asc("location"));
    }

    /**
     * 通过code获取下级列表
     *
     * @param code 标识
     * @return
     */
    @Override
    @CacheResult
    public List<Sys_dict> getSubListByCode(String code) {
        Sys_dict dict = this.fetch(Cnd.where("code", "=", code));
        return dict == null ? new ArrayList<>() : this.query(Cnd.where("parentId", "=", Strings.sNull(dict.getId())).asc("location"));
    }

    /**
     * 通过path获取下级map
     *
     * @param path 路径
     * @return
     */
    @Override
    @CacheResult
    public Map getSubMapByPath(String path) {
        return this.getMap(Sqls.create("select code,name from sys_dict where path like @path order by location asc").setParam("path", path + "____"));
    }

    /**
     * 通过id获取下级map
     *
     * @param id ID
     * @return
     */
    @Override
    @CacheResult
    public Map getSubMapById(String id) {
        return this.getMap(Sqls.create("select code,name from sys_dict where parentId = @id order by location asc").setParam("id", id));
    }

    /**
     * 通过code获取下级map
     *
     * @param code 字典标识
     * @return
     */
    @Override
    @CacheResult
    public Map getSubMapByCode(String code) {
        Sys_dict dict = this.fetch(Cnd.where("code", "=", code));
        return dict == null ? new HashMap() : this.getMap(Sqls.create("select code,name from sys_dict where parentId = @id order by location asc").setParam("id", dict.getId()));
    }

    /**
     * 新增字典
     *
     * @param dict 字典对象
     * @param pid 父ID
     */
    @Override
    @Aop(TransAop.READ_COMMITTED)
    public void save(Sys_dict dict, String pid) {
        String path = "";
        if (!Strings.isEmpty(pid)) {
            Sys_dict pp = this.fetch(pid);
            path = pp.getPath();
        }
        dict.setPath(getSubPath("sys_dict", "path", path));
        dict.setParentId(pid);
        dao().insert(dict);
        if (!Strings.isEmpty(pid)) {
            this.update(Chain.make("hasChildren", true), Cnd.where("id", "=", pid));
        }
    }

    /**
     * 级联删除单位
     *
     * @param dict 字典对象
     */
    @Override
    @Aop(TransAop.READ_COMMITTED)
    public void deleteAndChild(Sys_dict dict) {
        dao().execute(Sqls.create("delete from sys_dict where path like @path").setParam("path", dict.getPath() + "%"));
        if (!Strings.isEmpty(dict.getParentId())) {
            int count = count(Cnd.where("parentId", "=", dict.getParentId()));
            if (count < 1) {
                dao().execute(Sqls.create("update sys_dict set hasChildren=0 where id=@pid").setParam("pid", dict.getParentId()));
            }
        }
    }

    @Override
    @CacheRemoveAll
    @Async
    public void clearCache() {

    }
}
